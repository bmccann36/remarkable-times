const cheerio = require("cheerio");
const Epub = require("epub-gen");
const fs = require("fs");
const path = require("path");

const contentBuff = fs.readFileSync(path.join(__dirname, "..", "outStr.html"));

/**
 * create the ebook
 */
const bookName = "formatting test";
const ebookOptions = {
  title: bookName,
  author: "The New York Times",
  cover: path.join(__dirname, "..", "/staticFiles/nytImage.png"), // Url or File path, both ok.
  content: [
    {
      data: contentBuff.toString(),
    },
  ],
};
/**
 * write the epub to file
 */
new Epub(ebookOptions, "testFormat.epub");
