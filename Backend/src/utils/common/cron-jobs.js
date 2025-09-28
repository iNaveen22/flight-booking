const cron = require('node-cron');

const { BookingService } = require('../../services')

function scheduleCrons() {
    cron.schedule('*/30 * * * *', async () => {
        const response = await BookingService.cancelOldBookings();
        console.log(response);
    });
}

module.exports = scheduleCrons;