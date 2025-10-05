const { BookingService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common")
const { StatusCodes } = require("http-status-codes");
const { message } = require("../utils/common/error-response");

const inMemDb = {};

async function createBooking(req, res) {
    console.log("before booking")
    try {
        const response = await BookingService.createBooking({
            flightId: req.body.flightId,
            userId: req.body.userId,
            noOfSeats: req.body.noOfSeats
        });
        console.log("afetr the booking")
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
        const idempotencyKey = req.headers['x-idempotency-key'];
        if(!idempotencyKey || inMemDb[idempotencyKey]){
            return res
            .status(StatusCodes.BAD_REQUEST)
            .json({message: 'Cannot retry on a successful payment'});
        }
        const response = await BookingService.makePayment({
            totalCost: req.body.totalCost,
            userId: req.body.userId,
            bookingId: req.body.bookingId
        });
        inMemDb[idempotencyKey] = idempotencyKey
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