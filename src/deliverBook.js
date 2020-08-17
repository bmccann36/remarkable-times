const dotenv = require("dotenv");
const { Remarkable } = require("remarkable");

const fs = require("fs");
const path = require("path");
const utils = require("./utils")

dotenv.config();

module.exports = async function (displayName, epubFilePath){
  const client = new Remarkable({ deviceToken: process.env.DEVICE_TOKEN });
  await client.refreshToken();

  const epubFileBuffer = fs.readFileSync(epubFilePath);

  return client.uploadEPUB(displayName, utils.hashName(displayName), epubFileBuffer, utils.hashName('NYT briefings'));
}


