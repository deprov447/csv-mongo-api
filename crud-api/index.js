const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

mongoose.connect(
  process.env.DB_ADDR,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connection to DB successful")
);

const router = require("./routes");
app.use(express.json());
app.use(router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
