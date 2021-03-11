const express = require("express");
const db = require("./config/db");
const app = express();
const cors = require("cors");

db();

app.use(cors());

app.use(express.json());

app.use(express.json({ extended: false }));

app.use("/register", require("./routes/users"));
app.use("/login", require("./routes/auth"));
app.use("/todos", require("./routes/todos"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
