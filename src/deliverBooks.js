const dotenv = require("dotenv");
// const v5 = require('uuid/v5')
const JSZip = require("jszip");
const { Remarkable } = require("remarkable");
const { v5 } = require("uuid");
const fs = require("fs");
const path = require("path");
var zip = new require('node-zip')();

dotenv.config();

(async () => {
  const client = new Remarkable({ deviceToken: process.env.DEVICE_TOKEN });
  await client.refreshToken();

  const briefingFolderName = "NYT briefings";

  const ebookFile = fs.readFileSync(
    path.join(__dirname, "..", "generatedEbooks/8-16_NYT_newsletters.epub"),
  );

})();

function hashName(inputStr) {
  return v5(inputStr, "6a8bc369-8d8a-4e4c-bde7-fc9ac52fb66f");
}
