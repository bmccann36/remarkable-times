const cheerio = require("cheerio");
const fs = require("fs");

module.exports = function (newsLetterHtml) {
  // load data into cheerio parser
  const $ = cheerio.load(newsLetterHtml);

  // remove div styling
  $("div").each(function (i, el) {
    $(el).attr("style", null);
  });

  $("tbody").each(function (i, el) {
    $(el).find("span").attr("style", null);

    const tdStyle = $(el).find("td").attr("style");
    // remove font size
    if (tdStyle) {
      const newTdStyle = tdStyle.replace("font-size:0;", "");
      $(el).find("td").attr("style", newTdStyle);
    }
    // remove font size
    $(el).find("p").attr("style", null);
    const ulSpec = $(el).find("ul").attr("style");
    if (ulSpec) {
      // remove font size
      const newUlSpec = ulSpec.replace("font:10px georgia,serif;", "");
      $(el).find("ul").attr("style", newUlSpec);
    }
  });
  const emailContent = $('td[id="EMAIL_CONTAINER"]');
  //? for when you want to write to file
  // fs.writeFileSync("./nlHtml.html", emailContent.html());
  return emailContent.html();
};
