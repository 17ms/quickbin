#!/usr/bin/env bash

# Sets up new postgres database (owner via whoami), runs migrations 
# from ./src/configs/migrations, installs required modules from package.json & creates a temporary SSL cert

# Prequisities
[ "$#" -ne 1 ] && echo "Incorrect amount of arguments" && echo "Usage: $0 <db-name>" && exit 1
[ ! "$(pwd | rev | cut -d / -f 1 | rev)" = "quickbin" ] && echo "Please run the script inside project directory" && exit 1
! command -v createdb &> /dev/null && echo "Command 'createdb' not found, aborting setup" && exit 1
! command -v openssl &> /dev/null && echo "Command 'openssl' not found, aborting setup" && exit 1

# Setup
psql -l | grep -qi "$1" && echo "Database '$1' already exists" || echo "Creating database '$1'" && createdb "$1"
[ -f ".env" ] && echo "Found .env" || echo "Creating .env" && touch .env && printf "DB_USER=\"%s\"\nDB_PASSWORD=\"\"\nDB_NAME=\"%s\"" "$(whoami)" "$1" > .env
[ -d "node_modules" ] && echo "Found existing node_modules/" || echo "Installing required packages" && command -v yarn &> /dev/null && yarn install || npm install
echo "Creating temporary SSL cert" && openssl req \
    -newkey rsa:2048 \
    -nodes \
    -keyout key.pem \
    -x509 \
    -days 365 \
    -out cert.pem \
    -addext "subjectAltName = DNS:localhost" \
    -subj "/C=US/ST=Oregon/L=Portland/O=Company Name/OU=Org/CN=www.example.com"

echo "Running migrations from src/configs/migrations/" && npx knex migrate:latest --knexfile src/configs/knexfile.ts
echo "Development environment setup completed"
