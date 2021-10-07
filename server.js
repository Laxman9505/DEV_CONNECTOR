const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();
connectDB();
const port = process.env.PORT || 5000;

//Init middleware
app.use(express.json({ extended: false }));

//Define route
app.use("/api/users", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));

app.use("/api/profile", require("./routes/api/profile"));

app.use("/api/post", require("./routes/api/post"));

//serve the static assests in production
if (process.env.NODE_ENV == "production") {
  //set the static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
