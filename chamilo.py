# fetch grade page, if the page is different from last fetch, return 1 else 0
# download link for firefox webdriver https://github-releases.githubusercontent.com/25354393/8e6fbcea-60f2-4ed5-a39d-63b1a8a014be?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20211127%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211127T193406Z&X-Amz-Expires=300&X-Amz-Signature=f79b49f0390e15055bd27ed6d5954c39a55ad3bc038683c5ba45462710301be7&X-Amz-SignedHeaders=host&actor_id=78371321&key_id=0&repo_id=25354393&response-content-disposition=attachment%3B%20filename%3Dgeckodriver-v0.30.0-linux64.tar.gz&response-content-type=application%2Foctet-stream
from selenium import webdriver
from selenium.webdriver.firefox import service
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.common.by import By
from fake_useragent import UserAgent
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import os
import json

load_dotenv()
#--- const
course = {
    # 'course_name': (coef,grade)
}
#--- login data
username_txt = str(os.getenv('CHAMILO_USERNAME'))
password_txt = str(os.getenv('CHAMILO_PASSWORD'))
#--- selenium setup
firefox_options = webdriver.FirefoxOptions()
#--- faking user-agent to avoid bot detection
# ua = UserAgent()
# fake_user_agent = ua.random
# firefox_options.add_argument(f"user-agent={fake_user_agent}")
firefox_options.add_argument("--log-level=3")
# firefox_options.add_argument("--headless")
#--- urls
chamilo_login_url = "https://cas-uga.grenet.fr/login"
chamilo_grade_url = "https://scolarite-informatique.iut2.univ-grenoble-alpes.fr/app/ficheEtudiant.php"
# firefox_options.add_argument('--headless')

#--- driver binary setup & driver implementation
firefox_service = Service("/usr/local/bin/geckodriver")
driver = webdriver.Firefox(service=firefox_service, options=firefox_options)
#--- logging in
driver.get(chamilo_login_url)
username = driver.find_element(By.ID, 'username')
password = driver.find_element(By.ID, 'password')
submit = driver.find_element(By.NAME, 'submit')
username.send_keys(username_txt)
password.send_keys(password_txt)
submit.click()
#--- fetching grading page then parsing the page
grading_page = driver.get(chamilo_grade_url)
my_tasty_soup = BeautifulSoup(driver.page_source, "html.parser")
tbody_tag = my_tasty_soup.find('table').find('tbody')
rows = tbody_tag.find_all('tr')[3:]

for row in rows:
    course_name = (row.find('td').text.strip())
    course[course_name] = (row.findAll('td')[-3].text.strip(), row.findAll('td')[-2].text.strip())
    row = row.next_sibling
    if row is None:
        print("End Of Parse\n")
        break

must_update = 0
with open('grade.json', 'r') as f:
    previous_course_json = f.read()
    if previous_course_json == json.dumps(course, indent=4, ensure_ascii=False).encode('utf8').decode():
        print("up to date")
        exit(0)
    else:
        print("updating")
        must_update = 1

if must_update:
    with open('grade.json', 'w') as f:
        current_course_json = json.dumps(course, indent=4, ensure_ascii=False).encode('utf8').decode()
        f.write(current_course_json)