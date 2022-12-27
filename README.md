# Quickbin

Pastebin clone running a Node.js + Express backend with a basic HTML + CSS frontend.

## Getting started

Via included shellscript `setup_dev.sh` (creates a new postgres database, runs the migrations from `./src/configs/migrations`, creates a temporary SSL certificate for HTTPS and sets up **most of** `.env`):

```shell
chmod +x setup.sh
./setup.sh <name-for-the-database>
```

Manually:

```shell
createdb quickbin
yarn install
cp .env.template .env # manually fill in the details
```

The server can be started with `tsc && yarn start` after the setup is finished.

## Stack

- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Knex](https://knexjs.org/)
- [Passport](https://www.passportjs.org/)
- [Winston](https://github.com/winstonjs/winston)
