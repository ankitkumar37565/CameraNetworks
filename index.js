const express = require("express");
const app = express();
require("./config/db");
const port = 2031;
const router = require("./routers/router");

app.use(express.json());
app.use(function (err, req, res, next) {
    console.log("error:", err);
    res.status(500).send({ message: err.message ? err.message : "something went wrong" });
});

//loading routes
app.use(router);

//start the app on port 3000
app.listen(port, () => {
    console.log(`server running on http://127.0.0.1:${port}`);
});
