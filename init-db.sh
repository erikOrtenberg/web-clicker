#!/bin/sh

npm run generate-migrations:db
npm run push:db
npm run init:db

node build
