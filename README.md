# CSV - Mongo API

## Steps to start the server

- `git clone https://github.com/deprov447/csv-mongo-api.git`
- `cd csv-mongo-api`
- Edit `.env.example` file to add your desired port number & your database address
- `mv .env.example .env` (Renaming .env.example file to .env)
- `npm i`
- `npm start`

## API Documentation

> Please go to [this](https://go.postman.co/workspace/csv-mongo-api~19a68cb9-e941-43e9-9eeb-f73235ea41ab/collection/19226753-9756a146-33b2-424a-9727-e09246dd14e6) postman workspace for more.

### Upload CSV

**`PUT` req to `/`**

Specify a CSV file in `req body (form-data)` with field-name `csvFile` (a demo csv file is given [here](https://github.com/deprov447/csv-mongo-api/blob/master/democsvfile/myFile.csv))

### Create

**`POST` req to `/`**

Specify following fields in `req body (form-date)`:

- `firstname`
- `lastname`
- `email1`
- `email2`
- `profession`

### Read by quantity

**`GET` req to `/num=:num`**

Specify desired quantity in URL string (example: `/num=10`)

### Read by ID

**`GET` req to `/id=:id`**

Specify desired ID in URL string (example: `/id=< something >`)

### Update

**`POST` req to `/id=:id`**

Make a `POST` req to `/id=< something >` with all or some of the following fields in `req body (form-date)`:

- `firstname`
- `lastname`
- `email1`
- `email2`
- `profession`

### Delete

**`DELETE` req to `/id=:id`**

Make a `DELETE` req to URL `/id=< something >`
