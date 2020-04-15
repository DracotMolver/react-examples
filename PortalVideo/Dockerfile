FROM node:12.16

RUN mkdir /app && mkdir app/client
WORKDIR /app

COPY package.json /app

RUN npm install

WORKDIR /app/client

COPY client/package.json /app/client

RUN npm install

COPY . /app

WORKDIR /app

CMD ["npm", "start"]
