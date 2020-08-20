
const orchestrator = require('../newsLetter/orchestrator.js')


module.exports.main = async event => {
  await orchestrator()
};
