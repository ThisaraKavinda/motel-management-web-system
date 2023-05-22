import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    
    nic: {
        type: String,
    },
    guest: {
        type: Number,
    },
    night: {
        type: Number,
    },
    room: {
        type: Number,
    },
    date: {
        type: String,
    },
    appointmentDate: {
        type: String,
    },
    state: {
        type: String,
    }

});

export const AppointmentModel = mongoose.model('appointments', AppointmentSchema);