const { BookingService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common")
const { StatusCodes } = require("http-status-codes");

async function createBooking(req, res) {
    try {
        const response = await BookingService.createBooking({
            flightId: req.body.flightId,
            userId: req.body.userId,
            noOfSeats: req.body.noOfSeats
        });
        SuccessResponse.data = response;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

        ErrorResponse.error = error.message;
        return res
            .status(statusCode)
            .json(ErrorResponse);
    }
}

async function makePayment(req, res) {
    try {
        const response = await BookingService.makePayment({
            totalCost: req.body.totalCost,
            userId: req.body.userId,
            bookingId: req.body.bookingId
        });
        SuccessResponse.data = response;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

        ErrorResponse.error = error.message;
        return res
            .status(statusCode)
            .json(ErrorResponse);
    }
}

module.exports = {
    createBooking,
    makePayment
}