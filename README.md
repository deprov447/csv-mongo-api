# CSV - Mongo API

This repo consist of 2 seperate APIs:

- **parserAPI**: Has route that parses and sends a CSV file to MongoDB
- **crudAPI**: Has basic CRUD routes to work on previously uploaded data.

> [demoCSVFile/myFile.csv](https://github.com/deprov447/csv-mongo-api/blob/master/demoCSVFile/myFile.csv) is the file according to which the schema for both APIs is defined.

## Steps to start the servers

- `git clone https://github.com/deprov447/csv-mongo-api.git`
- `cd csv-mongo-api`
- Now `cd` into one of the two APIs (ideally in order: parserAPI > crudAPI)
- Edit `.env.example` file to add your desired port number and database address
- `mv .env.example .env` (Renaming .env.example file to .env)
- `npm i`
- `npm start`

# API Documentation

> Please go to [this](https://www.postman.com/deprov447/workspace/csv-mongo-api/overview) postman workspace for more.

## Parser API

**`PUT` req to `/`**

> Remember to `/register` and `/login` beforehand to get valid JWT token and place them in req.headers with key-value: `Authorization`: `JWT <token>`.

Specify a CSV file in `req body (form-data)` with field-name `csvFile` (a demo csv file is given [here](https://github.com/deprov447/csv-mongo-api/blob/master/demoCSVFile/myFile.csv))

---

## CRUD API

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
