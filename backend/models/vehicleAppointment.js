import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const vehicleAppointmentSchema = new Schema({
    
    appointmentID: {
        type: String,
    },
    vehicleID: {
        type: String,
    },
    nic: {
        type: String,
    },
    pickupPlace: {
        type: String,
    },
    pickupDate: {
        type: String,
    },
    pickupTime: {
        type: String,
    },
    endDate: {
        type: String,
    },
    endTime: {
        type: String,
    },
    VehicleSelected: {
        type: String,
    },
    amount: {
        type: Number,
    },
    status: {
        type: String,
    }


});

export const VehicleAppointmentModel = mongoose.model('vehiclesAppointment', vehicleAppointmentSchema);