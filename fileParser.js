const fs = require("fs");
const csv = require("csv-parser");

const fileParser = (filePath) => {
  let parsedObject = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => parsedObject.push(data))
    .on("end", () => {
      console.log(parsedObject);
      fs.unlink(filePath, () => {
        console.log("Deleted received file");
      });
      return parsedObject;
    });
};

module.exports = fileParser;
