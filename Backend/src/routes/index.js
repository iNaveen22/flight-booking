const express = require("express");
const v1router = require("./v1/index.js")

const apiRouter = express.Router();

apiRouter.use("/v1", v1router);

module.exports = apiRouter;