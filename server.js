const express = require("express");
const db = require("./config/db");
const app = express();
const cors = require("cors");
const path = require("path");

db();

app.use(cors());
app.use(express.json({ extended: false }));

const __dirname = path.resolve();
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

app.use("/register", require("./routes/users"));
app.use("/login", require("./routes/auth"));
app.use("/todos", require("./routes/todos"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
