const cheerio = require("cheerio");
const Epub = require("epub-gen");
const fs = require("fs");
const path = require("path");
const fetchedDocPath = path.join(__dirname, "..", "/fetchedPages");

// create pointer to documents directory
const docDir = fs.readdirSync(fetchedDocPath);

const today = new Date();

const dateStr = today.getMonth() + 1 + "-" + today.getDate();

/**
 * loop over the list of documents and create an e-book chapter for each
 */
const ebookContent = docDir.map((fileName) => {
  const nlHtml = fs.readFileSync(fetchedDocPath + "/" + fileName);
  const chapterName = fileName.replace(".html", " ") + dateStr;
  return {
    title: chapterName,
    data: nlHtml.toString(),
  };
});

/**
 * create the ebook
 */
const bookName = "NYT newsletters " + dateStr;
const ebookOptions = {
  title: bookName,
  author: "The New York Times",
  cover: path.join(__dirname, "..", "/staticFiles/nytImage.png"), // Url or File path, both ok.
  content: ebookContent,
};

/**
 * write the epub to file
 */
const fullFilePath = path.join(
  __dirname,
  "..",
  "generatedEbooks/",
  dateStr + "_NYT_newsletters" + ".epub",
);

new Epub(ebookOptions, fullFilePath);
