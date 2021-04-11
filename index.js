const express = require("express");
const app = express();



//bd
const mongoose = require('mongoose');
const db_access = require('./setup/bd').mongoURL;

mongoose
    .connect(db_access, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("conexão com o BD ok!"))
    .catch(err => console.log(err));


//login

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const auth = require("./routes/auth");
app.use("/auth", auth);



app.get("/", (req, res) => {
    res.send("Hello World!");
});

const port = 3000;

app.listen(port, () => console.log(`Executando na porta ${port}`));