const express = require("express");
const { unlink } = require("fs");
const multer = require("multer");

const fileParser = require("./fileParser");
const People = require("./schema/sampleSchema");

const router = express();
const upload = multer({ dest: "public/upload/" });
router.use(express.json());

// Send CSV to DB
router.put("/", upload.single("csvFile"), async (req, res) => {
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

router.use(upload.array());

// Create
router.post("/", (req, res) => {
  const data = new People(req.body);
  data
    .save()
    .then(({ _id }) => {
      res.sendStatus(201);
      console.log(`New doc added to DB with id=${_id}`);
    })
    .catch((err) => {
      res.sendStatus(500);
      throw err;
    });
});

// Read
router.get("/num=:num", async (req, res) => {
  const { num } = req.params;
  People.find({})
    .limit(num)
    .then((data) => {
      if (data == null) res.sendStatus(404);
      else {
        if (data.length < num) res.status(206);
        console.log(`Send first ${Math.min(num, data.length)} documents`);
        res.json(data);
      }
    })
    .catch((err) => {
      res.sendStatus(500);
      throw err;
    });
});

// Read
router.get("/id=:id", async (req, res) => {
  const { id } = req.params;
  People.findById(id)
    .then((data) => {
      if (data == null) res.sendStatus(404);
      else {
        console.log(`Send document with id=${id}`);
        res.json(data);
      }
    })
    .catch((err) => {
      res.sendStatus(500);
      throw err;
    });
});

// Update
router.post("/id=:id", async (req, res) => {
  const { id } = req.params;
  People.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (data == null) res.sendStatus(404);
      else {
        res.sendStatus(200);
        console.log(`Updated document with id=${id}`);
      }
    })
    .catch((err) => {
      res.sendStatus(500);
      throw err;
    });
});

// Delete
router.delete("/id=:id", async (req, res) => {
  const { id } = req.params;
  People.findByIdAndDelete(id)
    .then((data) => {
      if (data == null) res.sendStatus(404);
      else {
        res.sendStatus(200);
        console.log(`Deleted document with id=${id}`);
      }
    })
    .catch((err) => {
      res.sendStatus(500);
      throw err;
    });
});

module.exports = router;
