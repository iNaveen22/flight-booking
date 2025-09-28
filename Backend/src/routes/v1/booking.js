const express = require("express");
const axios = require("axios");
const {BookingController} = require("../../controllers");
const { Booking} = require("../../models/index")
const { FLIGHT_SERVICE } = require("../../config/server-config");
const { Model } = require("sequelize");

const router = express.Router();
 
router.post(
    '/', BookingController.createBooking
)

router.post(
    '/payments', 
    BookingController.makePayment
)
router.get('/',async(req,res)=>{
  try{
    const {userId} = req.query
    const data = await Booking.findAll({ 
    where: { userId }
}
  
);
  const detailedBookings = await Promise.all(
      data.map(async (booking) => {
        const flightRes = await axios.get(`${FLIGHT_SERVICE}/api/v1/flights/${booking.flightId}`);
        const flightData = flightRes.data;
         const departureRes = await axios.get(`${FLIGHT_SERVICE}/api/v1/airports/code/${flightData.data.departureAirportId}`);
           const arrivalRes = await axios.get(`${FLIGHT_SERVICE}/api/v1/airports/code/${flightData.data.arrivalAirportId}`);
        return { ...booking.toJSON(), flight: { ...flightData,
            departureAirport: departureRes.data.airport.name,
          arrivalAirport: arrivalRes.data.airport.name, } };
      })
    );
    
    
    res.status(200).json({  detailedBookings });
  }catch(err){
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

module.exports = router;