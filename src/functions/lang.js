module.exports = function (query) {
  let lang = require(`../language/${query}.json`);
  if (!lang) return "ERROR 404\nLANGUAGE NOT FOUND!";
  return lang;
};
