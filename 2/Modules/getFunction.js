module.exports = { getReq, logSomething };

function getReq(firstParam, path, fileName, paramsList) {
  firstParam.get(path, (req, res) => {
    res.render(fileName, paramsList);
  });
}

function logSomething(text) {
  console.log(text);
}
