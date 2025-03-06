const express = require("express");

const {InfoController} = require("../../controllers");
const bookingRoutes = require('./booking');

const v1router = express.Router();

v1router.get("/info", InfoController.info);

v1router.use("/bookings", bookingRoutes);

module.exports = v1router;
