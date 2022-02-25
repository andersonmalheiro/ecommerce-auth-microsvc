# Ecommerce Authentication Microservice

Simple microservice that handle authentication related endpoints in an e-commerce app

## :toolbox: Stack

- TypeScript
- Nest JS
- R2DBC
- Postgres

## :sparkles: Features

- REST API using NestJS
- JWT authentication
- TODO:
  - CI/CD
  - Test Coverage

---

## :rocket: Running the app

- Requirements:
  - Node (v14+)
  - Postgres
  - pgAdmin4 (optional)

___

### Develop

1. First, copy the `.env.example` in the root dir of the project and rename it to `.env` . Inside it you will find the environment variables necessary to the project run, so you will need to change the values accordingly.

2. Now, with pgAdmin or using the command line, create a Database (the name is up to you) and update the `DB_NAME` value with the name you have chose. Update the rest of the variables according to your database configuration and credentials.

3. Install the dependencies with: `yarn install` or `npm install`;

4. Generate prisma client:
    ```
    $ npx prisma generate
    ```

5. Apply prisma migrations to your database:
    ```
    $ npx prisma migrate deploy
    ```

5. Start the server:
    ```
    $ yarn start:dev
    ```

___

### Production

Run via Docker 🐳:

```shell
docker-compose up server
```
