
FROM node:10.11.0 

ADD ./ /
RUN npm install
WORKDIR /client
RUN npm install && npm run build
EXPOSE 3001
WORKDIR /
ENTRYPOINT ["sh", "-c", "npm run start:server"]