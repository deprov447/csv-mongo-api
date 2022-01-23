const express = require("express");
const multer = require("multer");

const authWare = require("./authMiddleware");
const People = require("./schema/sampleSchema");
const { signin, signup } = require("./authController");

const router = express();
const upload = multer();
router.use(upload.array());
router.use(express.json());

// Create
router.post("/", authWare, (req, res) => {
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

// Read by quantity
router.get("/num=:num", authWare, (req, res) => {
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

// Read by id
router.get("/id=:id", authWare, (req, res) => {
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
router.post("/id=:id", authWare, (req, res) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0) {
    res.sendStatus(400);
  }
  console.log(req.body);
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
router.delete("/id=:id", authWare, (req, res) => {
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

router.post("/register", signup, function (req, res) {});

router.post("/login", signin, function (req, res) {});

module.exports = router;
