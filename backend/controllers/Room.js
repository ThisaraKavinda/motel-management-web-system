import { RoomModel } from '../models/room.js';


export const addRoom = async (req, res) => {
    console.log(req.body);
    const room = new RoomModel({
        name: req.body.name,
        price: req.body.price,
        state: req.body.state,
        appointment: null
    });
    const details = await room.save();
    if (details) {
        res.send({
            status: true,
            details: details
        });
    } else {
        res.send({
            status: false,
        });
    }
}


export const getRooms = async (req, res) => {
    const room = await RoomModel.find({ state: "0" });
    res.send(room);
}

export const getAllRooms = async (req, res) => {
    const room = await RoomModel.find();
    res.send(room);
}

export const updateRoomState = async (req, res) => {
    try {
        for (let i = 0; i < req.body.roomArray.length; i++) {
       
            const room = await RoomModel.findOneAndUpdate(
                {
                    _id: req.body.roomArray[i].value
                },
                {
                    state: req.body.state,
                    appointment: req.body.appointment
                },
                {
                    new: true
                }
            );
            if (room) {
                res.send({
                    status: true,
                    details: room
                });
            } else {
                res.send({
                    status: false,
                });
            }
        }
    } catch (error) {
        console.log(error.messaga)
    }
}



export const updateRoomStateDone = async (req, res) => {
    try {
            const room = await RoomModel.update(
                {
                    appointment: req.body.id
                },
                {
                    state: "0",
                    appointment: null
                },
                {
                    new: true
                }
            );

            if (room) {
                res.send({
                    status: true,
                    details: room
                });
            } else {
                res.send({
                    status: false,
                });
            }
    } catch (error) {
        console.log(error.messaga)
    }
}

export const getRoomBill = async (req, res) => {
    const room = await RoomModel.find({ appointment: req.body.id });
    res.send(room);
}
