const express = require("express");

const {InfoController} = require("../../controllers");

const v1router = express.Router();


v1router.get("/info", InfoController.info);

module.exports = v1router;
