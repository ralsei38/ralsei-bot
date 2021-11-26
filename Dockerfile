# many runs because connections goes OOF change it afterward
FROM debian:stable
RUN apt-get update && apt-get upgrade -y
RUN apt-get install python3 python3-pip -y
RUN pip3 install selenium
RUN npm install dotenv
RUN npm install @discordjs/builders @discordjs/rest discord-api-types
COPY ./node.tar.xz /usr/bin
ENV PATH="/usr/bin/node-v16.13.0-linux-x64/bin/:${PATH}"
WORKDIR /usr/bin
RUN tar -xf node.tar.xz
ENTRYPOINT [ "node /root/home/code/index.js" ]