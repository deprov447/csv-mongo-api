const express = require("express");
const { unlink } = require("fs");
const multer = require("multer");

const fileParser = require("./fileParser");
const { signin, signup } = require("./authController");
const People = require("./schema/sampleSchema");
const authWare = require("./authMiddleware");

const router = express();
const upload = multer({ dest: "public/upload/" });
router.use(express.json());

// Send CSV to DB
router.put("/", upload.single("csvFile"), authWare, async (req, res) => {
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

router.post("/register", signup, function (req, res) {});

router.post("/login", signin, function (req, res) {});

module.exports = router;
