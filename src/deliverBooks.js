const dotenv = require("dotenv");
// const v5 = require('uuid/v5')
const JSZip = require("jszip");
const { Remarkable } = require("remarkable");
const { v5 } = require("uuid");

dotenv.config();

(async () => {
const client = new Remarkable({ deviceToken: process.env.DEVICE_TOKEN });
await client.refreshToken();

const folderName = 'NYT briefings'

const createdDir = await client.createDirectory(
  folderName,
  hashName(folderName)
);
console.log(createdDir);
//   // const deleteRes = await client.deleteItem('4a7bc369-8d8a-4e4c-bde7-fc9ac52fb66f', 1);
//   // console.log(deleteRes);
})();

function hashName(inputStr) {
  return v5(inputStr, "6a8bc369-8d8a-4e4c-bde7-fc9ac52fb66f");
}
