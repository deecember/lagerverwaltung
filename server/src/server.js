const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')


const app = express();
app.use(cors())

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({message: "Lagerverwaltung RESTful API"});
});

require("./routes/stock.routes.js")(app);

app.listen(3001, () => {
    console.log("Server is running on port 3001")
});