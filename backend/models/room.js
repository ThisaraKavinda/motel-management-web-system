import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    
    name: {
        type: String,
    },
    price: {
        type: String,
    },
    state: {
        type: String,
    },
    appointment: {
        type: String,
    }
    

});

export const RoomModel = mongoose.model('rooms', RoomSchema);