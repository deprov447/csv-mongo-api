const express = require("express");

const app = express();
const router = require("./routes");
app.use(router);

const PORT = process.env.PORT | 4000;

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
