FROM node:16-alpine3.17 AS builder

ENV DATABASE_URL=${DATABASE_URL}

RUN echo $DATABASE_URL

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma/
COPY config/db/init.sql /docker-entrypoint-initdb.d/

# Install app dependencies
RUN yarn

RUN yarn prisma:generate

COPY . .

RUN yarn build

FROM node:16-alpine3.17

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

RUN yarn prisma:migrate

EXPOSE 8080
CMD [ "yarn", "start:prod" ]
