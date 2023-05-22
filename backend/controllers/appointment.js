
import { AppointmentModel } from '../models/appointment.js';


export const addAppointment = async (req, res) => {

    let date_ob = new Date();

    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    
    let sysDate = year + "-" + month + "-" + date;


    console.log(req.body);
    const appointment = new AppointmentModel({
        nic: req.body.nic,
        guest: req.body.guest,
        night: req.body.night,
        room: req.body.room,
        date: sysDate,
        appointmentDate: req.body.appointmentDate,
        state: req.body.state
    });
    const details = await appointment.save();
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

export const getAllAppointments = async (req, res) => {
    const appointment = await AppointmentModel.find({});
    res.send(appointment);
}

export const getAllAppointmentsCount = async (req, res) => {
    const appointment = await AppointmentModel.find().count();
    res.send(String(appointment));
}

export const getAllPending = async (req, res) => {
    const appointment = await AppointmentModel.find({state:"Pending"});
    res.send(appointment);
}

export const getAllPendingCount = async (req, res) => {
    const appointment = await AppointmentModel.find({state:"Pending"}).count();
    res.send(String(appointment));
}

export const getAllActive = async (req, res) => {
    const appointment = await AppointmentModel.find({state:"Active"});
    res.send(appointment);
}

export const getAllActiveCount = async (req, res) => {
    const appointment = await AppointmentModel.find({state:"Active"}).count();
    res.send(String(appointment));
}

export const getAllDone = async (req, res) => {
    const appointment = await AppointmentModel.find({state:"Done"});
    res.send(appointment);
}

export const getAllDoneCount = async (req, res) => {
    const appointment = await AppointmentModel.find({state:"Done"}).count();
    res.send(String(appointment));
}

export const getAllCancel = async (req, res) => {
    const appointment = await AppointmentModel.find({state:"Cancel"});
    res.send(appointment);
}

export const getAllCancelCount = async (req, res) => {
    const appointment = await AppointmentModel.find({state:"Cancel"}).count();
    res.send(String(appointment));
}

export const deleteAppointment = async (req, res) => {
    const appointment = await AppointmentModel.findOneAndDelete({ _id: req.body.id });
    res.send(appointment);
}

export const editAppointment = async (req, res) => {
    try {
        console.log(req);
        const appointment = await AppointmentModel.findOneAndUpdate(
            {
                _id: req.body._id
            },
            {
                guest: req.body.guest,
                night: req.body.night,
                room: req.body.room,
                appointmentDate: req.body.appointmentDate,
                state:  req.body.state,
            },
            {
                new:true
            }
            );

        if (appointment) {
            res.send({
                status: true,
                details: appointment  
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



export const getSelectedAppointment = async (req, res) => {
    const appointment = await AppointmentModel.findOne({ _id: req.body.id });
    res.send(appointment);
}


export const updateAppointmentState = async (req, res) => {
    try {
        console.log(req);
        const appointment = await AppointmentModel.findOneAndUpdate(
            {
                _id: req.body._id
            },
            {
                _id: req.body._id,
                state: req.body.state
            },
            {
                new:true
            }
            );

        if (appointment) {
            res.send({
                status: true,
                details: appointment  
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


export const appointmentReport = async (req, res) => {
    const appointment = await AppointmentModel.find({appointmentDate: {$gte: req.body.startDate ,$lt: req.body.endDate}, state:"Done"});
    if (appointment) {
        res.send({
            status: true,
            details: appointment
        });
    } else {
        res.send({
            status: false,
        });
    }
}

export const getActiveAppointmentByCustomer = async (req, res) => {
    const appointment = await AppointmentModel.findOne({nic:req.body.nic, state:"Active"});
    if (appointment) {
        res.send({
            status: true,
            details: appointment
        });
    } else {
        res.send({
            status: false,
        });
    }
}