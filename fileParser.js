const csv = require("csvtojson");

const fileParser = async (filePath) => {
  return await csv().fromFile(filePath);
};

module.exports = fileParser;
