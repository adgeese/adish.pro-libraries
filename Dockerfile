FROM node:14-alpine

WORKDIR /usr/src/app

RUN wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy \
    && chmod +x cloud_sql_proxy

ENV PROJECT=prj-adp-d-adp-base-fefc
ENV CONNECT_SQL=${PROJECT}:us-central1:adish-pro-tv

COPY package.json ./

# Bundle app source
COPY index.js ./

RUN npm install --only-production

#     "adish.pro-libraries": "https://github.com/adgeese/adish.pro-libraries#latest",

EXPOSE 8080

ENTRYPOINT [ "sh", "-c", "./cloud_sql_proxy -instances=${CONNECT_SQL}=tcp:3306 &  npm start" ]
