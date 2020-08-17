const cheerio = require("cheerio");
const Epub = require("epub-gen");
const fs = require("fs");
const path = require("path");

const today = new Date();
const dateStr = today.getMonth() + 1 + "-" + today.getDate();

module.exports = function (newsArray, fullFilePath) {
  const ebookContent = newsArray.map((newsLetterItem) => {
    return {
      title: newsLetterItem.newsLetterName,
      data: newsLetterItem.html,
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
  new Epub(ebookOptions, fullFilePath);
};
