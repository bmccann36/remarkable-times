const getNewsletterContent = require("./getNewsletterContent");
const generateEpubZip = require("./generateEbooks");
const deliverBook = require("../deliverBook");
const reformatNLHtml = require("./reformatNLHtml");
const path = require("path");

const today = new Date();
const dateStr = today.getMonth() + 1 + "-" + today.getDate();

module.exports = async function(){
    // fetch newsletters as array of html text strings
    console.log("fetching newsletters");
    const nlContentArray = await getNewsletterContent();
  
    console.log("removing font formatting for e-pub optimization");
    const cleanedNlItemArray = nlContentArray.map((item) => {
      return {
        newsLetterName: item.newsLetterName,
        html: reformatNLHtml(item.html),
      };
    });
  
    console.log("generating epub zipfile");
    // create the ePubZip
    const zipFilePath = `${process.env.TEMP_DIR_PATH}/${dateStr}_NYT_newsletters.epub`;
  
    await generateEpubZip(cleanedNlItemArray, zipFilePath);
  
    await sleep(2000) //? why is this here?
  
    console.log("delivering eBook to remarkable cloud");
    await deliverBook(dateStr + "_NYT_newsletters", zipFilePath);
}


function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
