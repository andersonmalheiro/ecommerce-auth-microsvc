FROM node:14-alpine AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY yarn.lock ./
COPY prisma ./prisma/
COPY config/db/init.sql /docker-entrypoint-initdb.d/

# Install app dependencies
RUN npm install

RUN npm run prisma:generate

COPY . .

RUN npm run build

FROM node:14-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

RUN npm run prisma:migrate

EXPOSE 8080
CMD [ "npm", "run", "start:prod" ]
