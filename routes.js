const express = require("express");
const multer = require("multer");

const fileParser = require("./fileParser");

const router = express();
const upload = multer({ dest: "public/upload/" });

router.use(express.json());

router.post("/upload", upload.single("csvFile"), (req, res) => {
  const { path: filePath } = req.file;
  const parsedObject = fileParser(filePath);

  res.send("Collection created");
});

// Create
// Read
// Update
// Delete

module.exports = router;
