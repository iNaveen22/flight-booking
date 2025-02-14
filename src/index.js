const express = require("express");

const { serverConfig, Logger } = require("./config");

const apiRouter = require("./routes/index.js")

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use("/api", apiRouter);

app.listen(serverConfig.PORT, () => {
    console.log(`Server started at PORT: ${serverConfig.PORT}`);
    
});