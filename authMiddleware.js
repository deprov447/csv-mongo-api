const jwt = require("jsonwebtoken");
const User = require("./schema/userSchema");

const authWare = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.API_SECRET,
      function (err, decode) {
        if (err) req.user = undefined;
        User.findOne({
          _id: decode.id,
        }).exec((err, user) => {
          if (err) {
            res.status(500).send({
              message: err,
            });
          } else {
            req.user = user;
            console.log("Auth passed");
            next();
          }
        });
      }
    );
  } else {
    req.user = undefined;
    console.log("Auth failed");
    res.status(403).send({
      message: "Invalid JWT token",
    });
  }
};

module.exports = authWare;
