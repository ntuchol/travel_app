// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
// Start up an instance of app
const app = express();
/* Middleware*/
app.get("/route", function(req, res) {
  res.send(projectData);
});
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
app.use(express.static("website"));
// Initialize the main project folder

app.post("/add", addData);

function addData(request, response) {
  const newEntry = {
    temp: request.body.temp,
    date: request.body.date,
    content: request.body.content
  };
  projectData = newEntry;
  response.send(projectData);
  console.log(projectData);
}

app.get("/all", getData);

function getData(request, response) {
  response.send(projectData);
}

const port = 3000;
app.listen(port, listening);

function listening() {
  console.log(`running on localhost: ${port}`);
}
