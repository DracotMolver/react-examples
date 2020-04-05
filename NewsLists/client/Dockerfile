FROM node:12 as base

RUN mkdir /client
WORKDIR /client

COPY package.json /client

RUN npm install

COPY . /client

# ------------------------

FROM base as dev

ENV NODE_ENV=development
ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]

# ------------------------

FROM base as prod

ENV NODE_ENV=production
ENV PORT=8000

EXPOSE 8000

CMD ["npm", "run", "build"]
