import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    
    type: {
        type: String,
    },
    identification: {
        type: String,
    },
    vehicleNumber: {
        type: String,
    },
    driver: {
        type: String,
    },
    vehicleCapacity: {
        type: String,
    },
    state: {
        type: String,
    }

});

export const VehicleModel = mongoose.model('vehicles', vehicleSchema);