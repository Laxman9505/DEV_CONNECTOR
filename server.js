const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API RUNNING IN THE PORT");
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
