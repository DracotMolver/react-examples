FROM node:12 as base

RUN mkdir /server
WORKDIR /server

COPY package.json /server

RUN npm install

COPY . /server

# ------------------------

FROM base as dev

ENV NODE_ENV=development
ENV DB_NAME_DEV=reign_development
ENV DB_HOST_DEV=db
ENV APP_HOST="0.0.0.0"

EXPOSE 3000

CMD ["npm", "run", "dev"]

# ------------------------

FROM base as prod

ENV NODE_ENV=production
ENV DB_NAME=reign_production
ENV DB_HOST=db
ENV PORT=5000

EXPOSE 5000

CMD ["npm", "start"]
