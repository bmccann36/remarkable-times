import fs from "fs";
import path from "path";
// import uuidv4 from 'uuid/v4';
import dotenv from "dotenv";
import v5 from "uuid/v5";
import JSZip, { folder } from "jszip";

import { Remarkable } from ".";

dotenv.config();

(async () => {
  const client = new Remarkable({ deviceToken: process.env.DEVICE_TOKEN });
  await client.refreshToken();

  // const epubFileBuffer = fs.readFileSync(
  //   path.join(__dirname, "..", "..", "8-16_NYT_newsletters.epub"),
  // );

  // await client.uploadEPUB("epubTStest", hashName("epubTStest"), epubFileBuffer, hashName('NYT briefings'));

  const deleteRes = await client.deleteItem('5158cdf2-5548-51ae-a72b-00594c147dc3', 1);
  console.log(deleteRes);
})();

function hashName(inputStr: string) {
  return v5(inputStr, "6a8bc369-8d8a-4e4c-bde7-fc9ac52fb66f");
}
