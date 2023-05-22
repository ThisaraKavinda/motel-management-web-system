import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    
    name: {
        required: true,
        type: String,
    },
    type: {
        required: true,
        type: String,
    },
    category: {
        required: true,
        type: String,
    },
    regularPrice: {
        type: String,
    },
    largePrice: {
        type: String,
    },
    familyPrice: {
        type: String,
    },
    specialPrice: {
        type: String,
    },
    image: {
        type: String,
    },
    availability: {
        required: true,
        type: String,
    }

});

export const Food = mongoose.model('foods', FoodSchema);