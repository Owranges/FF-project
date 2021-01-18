const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
// const config = require("./modules/config")

const connection = require("./database/database.js");
connection.connect();

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        req.header("Access-Control-Request-Method")
    );
    res.header(
        "Access-Control-Allow-Headers",
        req.header("Access-Control-Request-Headers")
    );
    next();
});

// app.use("/", require("./routes/routes"));
require('./routes/UserRoutes')(app, connection)
require('./routes/ForumRoutes')(app, connection)
require('./routes/AdminRoutes')(app, connection)

app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});



