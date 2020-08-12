const cheerio = require('cheerio');
const Epub = require("epub-gen");
const fs = require('fs')
const path = require('path')
const fetchedDocPath = (path.join(__dirname, "..", "/fetchedPages"));


const docDir = fs.readdirSync(fetchedDocPath)

const ebookContent = docDir.map(fileName => {
  const nlHtml = fs.readFileSync(fetchedDocPath + "/" + fileName)
  return {
    title: fileName.replace(".html", ""),
    data: nlHtml.toString()
  }
})

const option = {
  title: "NYT newsletters", // Required, title of the book.
  author: "The New York Times", // Required, name of the author.
  cover: path.join(__dirname, "..", "/staticFiles/nytImage.png"), // Url or File path, both ok.
  content: ebookContent
};

new Epub(option, path.join(__dirname, "..", "testEbook.epub"));
