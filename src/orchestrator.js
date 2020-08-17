const getNewsletterContent = require("./getNewsletterContent");
const generateEpubZip = require("./generateEbooks");
const deliverBook = require("./deliverBook");
const path = require("path");

const today = new Date();
const dateStr = today.getMonth() + 1 + "-" + today.getDate();

(async () => {
  // fetch newsletters as array of html text strings
  console.log("fetching newsletters");
  const nlContentArray = await getNewsletterContent();

  // create the ePubZip
  const zipFilePath = path.join(
    __dirname,
    "..",
    "generatedEbooks/",
    dateStr + "_NYT_newsletters" + ".epub",
  );
  console.log("generating epub zipfile");
  await generateEpubZip(nlContentArray, zipFilePath);

  console.log("delivering eBook to remarkable cloud");
  await deliverBook(dateStr + "_NYT_newsletters", zipFilePath);
})();
