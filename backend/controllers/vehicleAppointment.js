
import { VehicleAppointmentModel } from '../models/vehicleAppointment.js';


export const addAppoinmentVehicle = async (req, res) => {
    const vehicle = new VehicleAppointmentModel({
        appointmentID: req.body.appointmentID,
        vehicleID: req.body.vehicleID,
        nic: req.body.nic,
        pickupPlace: req.body.pickupPlace,
        pickupDate: req.body.pickupDate,
        pickupTime: req.body.pickupTime,
        endDate: req.body.endDate,
        endTime: req.body.endTime,
        VehicleSelected: req.body.VehicleSelected,
        amount: req.body.amount,
        status: req.body.status
    });
    const details = await vehicle.save();
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

export const getAllVehicleAppointments = async (req, res) => {
    const vehicles = await VehicleAppointmentModel.find({});
    res.send(vehicles);
}

export const getAllVehicleAppointmentCount = async (req, res) => {
    const vehicles = await VehicleAppointmentModel.find().count();
    res.send(String(vehicles));
}


export const deleteVehicleAppointment = async (req, res) => {
    const vehicle = await VehicleAppointmentModel.findOneAndDelete({ _id: req.body.id });
    res.send(vehicle);
}

export const editVehicleAppointment = async (req, res) => {
    try {
        
        const vehicle = await VehicleAppointmentModel.findOneAndUpdate(
            {
                _id: req.body._id
            },
            {
                _id: req.body._id,
                appointmentID: req.body.appointmentID,
                vehicleID: req.body.vehicleID,
                nic: req.body.nic,
                pickupPlace: req.body.pickupPlace,
                pickupDate: req.body.pickupDate,
                pickupTime: req.body.pickupTime,
                endDate: req.body.endDate,
                endTime: req.body.endTime,
                VehicleSelected: req.body.VehicleSelected,
                amount: req.body.amount,
                status: req.body.status
            },
            {
                new:true
            }
            );

        if (vehicle) {
            res.send({
                status: true,
                details: vehicle  
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



export const getSelectedVehicleAppointment = async (req, res) => {
    const vehicle = await VehicleAppointmentModel.findOne({ _id: req.body.id });
    res.send(vehicle);
}

export const getAllDriving = async (req, res, next) => {
    const vehicles = await VehicleAppointmentModel.find({status:"driving"});
    res.send(vehicles);
}

export const getAllCompleted = async (req, res, next) => {
    const vehicles = await VehicleAppointmentModel.find({status:"Completed"});
    res.send(vehicles);
}

export const getVehicleAppoinmentForSelectedPeriod = async (req, res) => {

    let startDate = req.params.startDate;
    let endDate = req.params.endDate;
    // let startDate = new Date(+startDateArr[0], +startDateArr[1] - 1, +startDateArr[2])
    // let startDate = new Date(startDateString).toISOString();
    // let endDate = new Date(endDateString).toISOString();

    let orderList = [];
    let response = [];
    // await FoodCart.distinct('orderId', {'date': { $lte: endDateString}})
    await VehicleAppointmentModel.find({'pickupDate': { $gte: startDate, $lte: endDate}}).distinct('VehicleSelected')
    .then((orders) => { 
        console.log(orders)    
        orderList = orders
    }).catch(err => {
        console.error(err);
    })

    for (let order of orderList) {    
        await VehicleAppointmentModel.find({'VehicleSelected': order}).then((result) => {
            // console.log(result);
            if (result.length > 0) {
                let item = {};
                item.VehicleSelected = order;
                item.count = 0;
                item.totalPrice = 0;
                for (let orderItem of result) {
                    item.count +=1;
                    item.totalPrice += Number(orderItem.amount);
                }
                // console.log(item);
                response.push(item);
            }
            
        })
    }

    res.send(response)
}

export const getVehicleAppointmentBill = async (req, res) => {
    const vehicles = await VehicleAppointmentModel.find({appointmentID: req.body.id});
    res.send(vehicles);
}