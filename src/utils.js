const { v5 } = require("uuid");

function hashName(inputStr) {
  return v5(inputStr, "6a8bc369-8d8a-4e4c-bde7-fc9ac52fb66f");
}

module.exports = { hashName };
