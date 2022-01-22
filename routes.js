const express = require("express");
const { unlink } = require("fs");
const multer = require("multer");

const fileParser = require("./fileParser");
const People = require("./schema/sampleSchema");

const router = express();
const upload = multer({ dest: "public/upload/" });
router.use(upload.array());

router.use(express.json());

// Send CSV to DB
router.post("/upload", upload.single("csvFile"), async (req, res) => {
  const { path: filePath } = req.file;
  const parsedObject = await fileParser(filePath);

  People.create(parsedObject)
    .then(() => {
      console.log("Data sent to DB");
      unlink(filePath, (err) => {
        if (err) throw err;
        console.log("Deleted raw CSV file");
      });
      res.json(parsedObject);
    })
    .catch((err) => {
      res.sendStatus(501);
      throw err;
    });
});

// Create
router.post("/create", (req, res) => {
  const data = new People(req.body);
  data
    .save()
    .then(() => {
      res.sendStatus(201);
      console.log("New doc added to DB");
    })
    .catch((err) => {
      res.sendStatus(500);
      throw err;
    });
});

// Read
router.get("/read/num=:num", async (req, res) => {
  const { num } = req.params;
  const data = await People.find({}).limit(num);
  console.log(data);
  res.json({});
});

// Update
// Delete

module.exports = router;
