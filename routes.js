const express = require("express");
const { unlink } = require("fs");
const multer = require("multer");

const fileParser = require("./fileParser");

const router = express();
const upload = multer({ dest: "public/upload/" });
const People = require("./schema/sampleSchema");

router.use(express.json());

router.post("/upload", upload.single("csvFile"), async (req, res) => {
  const { path: filePath } = req.file;
  var parsedObject = await fileParser(filePath);

  People.create(parsedObject, (err) => {
    if (err) throw err;
    else {
      console.log("Data sent to DB");
      unlink(filePath, (err) => {
        if (err) throw err;
        console.log("Deleted raw CSV file");
      });
    }
  });

  res.json(parsedObject);
});

// Create
// Read
// Update
// Delete

module.exports = router;
