const cheerio = require("cheerio");

module.exports = function (newsLetterHtml) {
  // load data into cheerio parser
  const $ = cheerio.load(newsLetterHtml);
  /**
   * iterate over all table body elements
   */
  $("tbody").each(function (i, el) {
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

      const spanStyle = $(el).find("span").attr("style");
      const newSpanStyle = spanStyle
        .replace("font-size:17px;", "")
        .replace("color:#dcdcdc;", "");
      // console.log(newSpanStyle);
      $(el).find("span").attr("style", newSpanStyle);
    }
  });
  return $.html();
};
