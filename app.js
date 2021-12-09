// MODULES

const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const date = require(__dirname + "/modules/date.js");

const getDay = require(__dirname + "/modules/getDay.js");

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: true }));

// VARIABLES

const PORT = process.env.PORT || 3000;

let kindOfDay = date();

let day = getDay();

let response = ["Buy food", "Cook food", "Eat food"];

let workList = [];

// REQUEST AND GETS

app.get("/", (req, res) => {
  // ASSIGNING NEW VALUES TO RESPONSE LIST VARIABLE

  response = ["Buy food", "Cook food", "Eat food"];

  // RENDERING THE FILE

  renderViewEngine("list", res, response);
});

app.get("/work", (req, res) => {
  // RENDERING THE FILE

  res.render("work");
});

app.listen(PORT, () => {
  // SENDING MESSAGE AFTER RUNNING

  console.log(`Server running on port [ ${PORT}] `);
});

app.post("/", (req, res) => {
  if (req.body.button === "next") {
    res.redirect("/work");
  } else {
    // PUSHING POSTED ELEMENTS TO RESPONSE LIST

    response.push(req.body.ToDo);

    // RENDERING THE FILE

    renderViewEngine("list", res, response);
  }
});

app.post("/work", (req, res) => {
  // PUSHING POSTED ELEMENTS TO WORK LIST

  workList.push(req.body.ToDo);

  // RENDERING THE FILE

  renderViewEngine("list", res, workList);
});

// RENDERING THE LIST.EJS FILE, FUNCTION

const renderViewEngine = (ejsFile, rend, value) => {
  // RENDERING THE FILE USING EXTERNAL PARAMETERS

  rend.render(ejsFile, {
    /* parameter */
    kindOfDay: /* Value of the parameter */ kindOfDay,
    numberOfDay: day,
    toDo: value,
  });
};
