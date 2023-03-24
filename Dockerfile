FROM node:16-alpine3.17

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY . .

RUN yarn install --frozen-lockfile

ENV NODE_ENV production

EXPOSE 8080

CMD [ "yarn", "start:prod" ]
