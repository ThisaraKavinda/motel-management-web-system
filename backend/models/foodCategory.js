import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FoodCategorySchema = new Schema({
    
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
    }

});

export const FoodCategory = mongoose.model('foodcategories', FoodCategorySchema);