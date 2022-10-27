FROM node:16

WORKDIR /userMS
COPY package.json .
RUN npm install
COPY . .
CMD npm start