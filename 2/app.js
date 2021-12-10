// REQUIRES

const express = require("express");

const bodyParser = require("body-parser");

const getFunc = require(__dirname + "/Modules/getFunction.js");

const app = express();

// APP SETUPS

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public/styles"));

app.set("view engine", "ejs");

// VARIABLES

const PORT = process.env.PORT || 3000;

let funcGet = getFunc.getReq;

let log = getFunc.logSomething;

let docTitle = "You got to the first page!";

const docNameList = [];
const paragraphContent = [];

// GET AND POST REQUEST

funcGet(app, "/", "index", {
  divName: docNameList,
  paragraphContent: paragraphContent,
});

funcGet(app, "/work", "work-page", "");

app.post("/", (req, res) => {
  docNameList.push(req.body.setTitle);
  paragraphContent.push(req.body.setParagraph);

  res.render("index", {
    divName: docNameList,
    paragraphContent: paragraphContent,
  });

  docNameList.forEach((element) => {
    app.get(`/${element.replace(/\s+/g, "-")}`, (req, res) => {
      res.render("work-page", {
        title: element,
        content: paragraphContent[docNameList.indexOf(element)],
      });
    });
  });
});

// START THE SERVER

app.listen(PORT, () => {
  log(`Server running on port ${PORT}`);
});
