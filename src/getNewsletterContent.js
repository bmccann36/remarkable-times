const fs = require('fs')
const contentUrls = fs.readFileSync('./newsletterList.json', 'utf8')
const axios = require('axios').default;
const path = require('path');

const urlList = JSON.parse(contentUrls);
console.log(urlList[0]);

const fetchedDocPath = (path.join(__dirname, "..", "/fetchedPages"));

urlList.map((nlData) => {
  axios.get(nlData.url).then((res) => {
    fs.writeFileSync(`${fetchedDocPath}/${nlData.name}.html`, res.data)
  })
})




