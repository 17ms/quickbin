# Quickbin - Minimalistic clone of Pastebin

Simple web-application with user authentication. Made as a practice project to learn about creating and running a Node.js + Express web-application backend.

## Getting started

If you're using a UNIX-based system (and have npm/yarn & postgres installed), feel free to use the included `setup.sh`, which will setup the postgres database, create a template for .env and run the migrations:

- Note that the script uses `whoami` for DB_USER and you should not use it if you don't have or want the default configuration for your database.

```shell
chmod +x setup.sh
./setup.sh <name-for-the-database>
```

Or without the script by filling out the information inside .env yourself before running the migrations:

```shell
createdb <name-for-the-database>
yarn install
touch .env && printf "DB_USER=\nDB_PASSWORD=\nDB_NAME=" > .env

# Fill .env before this step
npx knex migrate:latest --knexfile src/configs/knexfile.ts
```

After finishing the setup you can start the server by running `tsc && yarn start`.

## Built with

- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Knex](https://knexjs.org/)
- [Passport](https://www.passportjs.org/)
- [Winston](https://github.com/winstonjs/winston)
