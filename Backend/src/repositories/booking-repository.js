const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error")
const { Op } = require('sequelize');

const { Booking } = require("../models");
const CrudRepository = require("./crud-repository");
const { Enums } = require("../utils/common");
const { BOOKED, CANCELLED } = Enums.BOOKING_STATUS

class BookingRepository extends CrudRepository {
    constructor() {
        super(Booking);
    }

    async createBooking(data, transaction = null) {
        const response = await Booking.create(data, { transaction: transaction });
        return response;
    }



    async cancelOldBookings(timestamp, transaction = null) {
        return await Booking.update({ status: CANCELLED }, {
            where: {
                [Op.and]: [
                    { createdAt: { [Op.lt]: timestamp } },
                    { status: { [Op.ne]: BOOKED } },
                    { status: { [Op.ne]: CANCELLED } }
                ]
            },
            transaction
        }
        );
    }
}

module.exports = BookingRepository;