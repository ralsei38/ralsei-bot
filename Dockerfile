# many runs because connections goes OOF change it afterward
FROM debian:stable
RUN apt-get update && apt-get upgrade -y
RUN apt-get install python3 python3-pip -y
RUN apt-get install wget -y
RUN apt-get install npm -y
RUN apt-get install firefox-esr -y

#pip3
RUN pip3 install selenium
RUN pip3 install python-dotenv
RUN pip3 install fake-useragent
RUN pip3 install bs4

#npm
RUN npm install -g npm@8.1.4
RUN npm cache clean -f
RUN npm install -g n
RUN n stable

WORKDIR /usr/local/bin
#nodejs install
RUN wget https://nodejs.org/dist/v16.13.0/node-v16.13.0.tar.gz
RUN tar -xf node-v16.13.0.tar.gz

#geckodriver install
RUN wget github.com/mozilla/geckodriver/releases/download/v0.30.0/geckodriver-v0.30.0-linux64.tar.gz
RUN tar -xf  geckodriver-v0.30.0-linux64.tar.gz

#nodejs configuration
WORKDIR  /usr/local/bin/node-v16.13.0
RUN ./configure

ENV PATH="/usr/local/bin/geckodriver:${PATH}"
ENV PATH="/usr/local/bin/node-v16.13.0:${PATH}"

RUN npm install -g dotenv
RUN npm install -g @discordjs/builders @discordjs/rest discord-api-types

#selenium dependencies
WORKDIR /root/code

# ENTRYPOINT [ "python3", "chamilo.py" ]
ENTRYPOINT [ "tail", "-f", "/dev/null" ]