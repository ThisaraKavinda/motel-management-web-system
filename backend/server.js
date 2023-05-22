import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

// Routers
import customerRouter from './routes/customer.js';
import appointmentRouter from './routes/appointment.js';
import employeeRouter from './routes/employee.js';
import vehicleyRouter from './routes/vehicle.js';
import roomRouter from './routes/room.js';
import vehicleBookingRouter from './routes/vehicleBooking.js';
import foodRouter from './routes/food.js';
import foodCartRouter from './routes/foodCart.js';
import vehicleAppointmentRouter from './routes/vehicleAppointment.js';

// Constants
dotenv.config()
const URL=process.env.MONGODB_URL;
const PORT = process.env.PORT || 8060
const app = express()

app.use(cors())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))


mongoose.connect(URL, {
    useUnifiedTopology: true
})

const connection = mongoose.connection
connection.once("open", () => {
    console.log("mongo_db connection success!")
})

// Routers use
app.use('/customer', customerRouter);
app.use('/appointment', appointmentRouter);
app.use('/employee', employeeRouter);
app.use('/vehicle', vehicleyRouter);
app.use('/room', roomRouter);
app.use('/vehicleBooking', vehicleBookingRouter);
app.use('/food', foodRouter);
app.use('/vehicleAppointment', vehicleAppointmentRouter);
app.use('/foodCart', foodCartRouter);



app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))