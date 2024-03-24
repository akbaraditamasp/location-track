const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}));

app.post("/locs", (req, res) => {
  const locs = JSON.parse(
    fs.readFileSync(path.resolve("location.json"), "utf-8")
  );
  locs.push({
    lat: req.body.lat,
    long: req.body.long,
  });

  fs.writeFileSync(path.resolve("location.json"), JSON.stringify(locs));

  res.sendStatus(200);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve("index.html"));
});

app.listen(3100, () => {
  console.log("launched");
});
