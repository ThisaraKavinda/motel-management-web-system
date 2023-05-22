import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FoodCartSchema = new Schema({
    
    reservationId: {
        type: String,
    },
    date: {
        type: String,
    },
    time: {
        type: String,
    },
    itemId: {
        type: String,
    },
    itemName: {
        type: String,
    },
    price: {
        type: String,
    },
    orderId: {
        type: String,
    },
    nic : {
        type: String,
    }

});

export const FoodCart = mongoose.model('foodcart', FoodCartSchema);