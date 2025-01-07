const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const errorsHandler = require("./middlewares/errorsHandles");
const notFound = require("./middlewares/notFound");
const corsPolicy = require("./middlewares/corspolicy");
const exampleRouter = require("./routes/examples");

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.use(corsPolicy);

app.use(express.json());

app.use("/examples", exampleRouter);

app.use(errorsHandler);

app.use(notFound);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});