#!/usr/bin/env bash

# Handles setup for postgres database and knex migrations

[ "$#" -ne 1 ] && echo "Incorrect amount of arguments" && echo "Usage: $0 <db-name>" && exit 1

if ! command -v psql &> /dev/null
then
    echo "Command 'psql' not found, aborting setup"
    exit 1
fi

if ! psql -l | cut -d \| -f 1 | grep -qwi "$1"
then
    echo "Creating database '$1'"
    createdb "$1"
fi

if [ "$(pwd | rev | cut -d / -f 1 | rev)" = "quickbin" ]
then
    if [ -f ".env" ]
    then
        echo "Found .env"
    else
        echo "Creating .env with a template"
        USER=$(whoami)
        touch .env && printf "DB_USER=%s\nDB_PASSWORD=\"\"\nDB_NAME=%s" "$USER" "$1" > .env
    fi

    if command -v yarn &> /dev/null
    then
        echo "Installing required packages with yarn"
        yarn install
    else
        echo "Installing required packages with npm"
        npm install
    fi

    echo "Running latest migrations with knex" && npx knex migrate:latest --knexfile src/configs/knexfile.ts
else
    echo "Run the installation script in the project's folder"
    exit 1
fi
