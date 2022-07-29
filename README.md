# Storefront Backend Project

## Required Technologies
The application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Packages 

#### Dependencies
```sh
npm i bcrypt
npm i db-migrate
npm i db-migrate-pg
npm i dotenv
npm i express
npm i helmet 
npm i jasmine-spec-reporter
npm i jsonwebtoken
npm i morgan
npm i pg 
```
# Dev Dependencies And TypeScript definitions for Packages
```sh
npm i --save-dev eslint
npm i --save-dev eslint-config-prettier
npm i --save-dev eslint-plugin-prettier
npm i --save-dev jasmine
npm i --save-dev nodemon
npm i --save-dev prettier
npm i --save-dev supertest
npm i --save-dev ts-node
npm i --save-dev typescript
npm install --save-dev @types/bcrypt
npm install --save-dev @types/express
npm install --save-dev @types/jasmine
npm install --save-dev @types/jsonwebtoken
npm install --save-dev @types/morgan
npm install --save-dev @types/node
npm install --save-dev @types/pg
npm install --save-dev @types/supertest
npm install --save-dev @typescript-eslint/eslint-plugin
npm install --save-dev @typescript-eslint/parser
npm install --sava-dev @types/morgan
```

### Database Setup

### Database Creation 

```sh
# create user
CREATE USER full_stack_std WITH PASSWORD 'password123';

# create Database
CREATE DATABASE store; CREATE DATABASE store_test;

# grant all databases to the user
GRANT ALL PRIVILEGES ON DATABASE store TO full_stack_std; GRANT ALL PRIVILEGES ON DATABASE store_test TO full_stack_std;
```

### Database Migrations
```sh
db-migrate up
# Migrations used in this project
db-migrate create add-users-table --sql-file
db-migrate create add-products-table --sql-file
db-migrate create add-orders-table --sql-file
db-migrate create add-ordered-products-table --sql-file
```

### Environmental Variables (.env file contents)
```sh
PORT=3000
ENV=dev
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=store
POSTGRES_DB_TEST=store_test
POSTGRES_USER=full_stack_std
POSTGRES_PASSWORD=password123
BCRYPT_PASSWORD =your-secret-password
SALT_ROUND=10
TOKEN_SECRET=your-secret-token

```
### Testing
```sh
npm run test
```

### Run Project
```sh
npm run start
```



