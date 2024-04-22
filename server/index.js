const express = require("express");
const path = require("path");

var app = express();

app.use(express.static(path.join(__dirname, '../dist/browser')));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/browser/index.html"))
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
})

