const express = require("express");
const db = require("./config/db");
const app = express();
const path = require("path");

db();

app.use(express.json({ extended: false }));

var __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use("/api/register", require("./routes/users"));
app.use("/api/login", require("./routes/auth"));
app.use("/api/todos", require("./routes/todos"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
