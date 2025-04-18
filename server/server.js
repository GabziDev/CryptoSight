require('dotenv').config();
const express = require("express");
const cors = require('cors');
const path = require('path');
const config = require("./config.json");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use("/", require("./routes/auth.routes"));
app.use("/", require("./routes/favorites.routes"));
app.use("/", require("./routes/user.routes"));

app.listen(config.port, () => {
    console.log(`Server start :${config.port}`);
});