import axios from 'axios';

// Config
import { baseURL } from '../config';

export const addVehicleBooking = async (details) => {
    const { data } = await axios.post(baseURL + '/vehicleBooking/add/', details);
    return data;
}

export const getAllVehicleBooking = async () => {
    const { data } = await axios.get(baseURL + '/vehicleBooking/getAllVehicleBooking/');
    return data;
}

export const deleteVehicleBooking = async (id) => {
    const { data } = await axios.post(baseURL + '/vehicleBooking/delete/', {id: id});
    return data;
}

export const editVehicleBooking = async (details) => {
    const { data } = await axios.post(baseURL + '/vehicleBooking/edit/', details);
    return data;
}

export const getSelectedVehicleBooking = async (id) => {
    const { data } = await axios.post(baseURL + '/vehicleBooking/getSelectedVehicleBooking/', {id: id});
    return data;
}

export const getAllVehicleBookingCount = async () => {
    const { data } = await axios.get(baseURL + '/vehicleBooking/getAllVehicleBookingCount/');
    return data;
}

export const getAllPending = async () => {
    const { data } = await axios.get(baseURL + '/vehicleBooking/getAllpendingBookings/');
    return data;
}

export const editVehicleAppointmentState = async (id) => {
    const { data } = await axios.post(baseURL + '/vehicleBooking/editVehicleBookingState/', {id: id});
    return data;
}


