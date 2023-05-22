import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    nic: {
        type: String,
    },
    contactNo: {
        type: String,
    },
    state: {
        type: String,
    }

});

export const CustomerModel = mongoose.model('customers', CustomerSchema);