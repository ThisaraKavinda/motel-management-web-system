import axios from 'axios';

// Config
import { baseURL } from '../config';

export const addAppointment = async (details) => {
    const { data } = await axios.post(baseURL + '/appointment/add/', details);
    return data;
}

export const getAllAppointments = async () => {
    const { data } = await axios.get(baseURL + '/appointment/getAllAppointments/');
    return data;
}

export const deleteAppointment = async (id) => {
    const { data } = await axios.post(baseURL + '/appointment/delete/', {id: id});
    return data;
}

export const editAppointment = async (details) => {
    const { data } = await axios.post(baseURL + '/appointment/edit/', details);
    return data;
}

export const getSelectedAppointment = async (id) => {
    const { data } = await axios.post(baseURL + '/appointment/getSelectedAppointment/', {id: id});
    return data;
}

export const getAllAppointmentsCount = async () => {
    const { data } = await axios.get(baseURL + '/appointment/getAllAppointmentsCount/');
    return data;
}

export const getAllPending = async () => {
    const { data } = await axios.get(baseURL + '/appointment/getAllPending/');
    return data;
}

export const getAllPendingCount = async () => {
    const { data } = await axios.get(baseURL + '/appointment/getAllPendingCount/');
    return data;
}

export const getAllActive = async () => {
    const { data } = await axios.get(baseURL + '/appointment/getAllActive/');
    return data;
}

export const getAllActiveCount = async () => {
    const { data } = await axios.get(baseURL + '/appointment/getAllActiveCount/');
    return data;
}

export const getAllDone = async () => {
    const { data } = await axios.get(baseURL + '/appointment/getAllDone/');
    return data;
}

export const getAllDoneCount = async () => {
    const { data } = await axios.get(baseURL + '/appointment/getAllDoneCount/');
    return data;
}

export const getAllCancel = async () => {
    const { data } = await axios.get(baseURL + '/appointment/getAllCancel/');
    return data;
}

export const getAllCancelCount = async () => {
    const { data } = await axios.get(baseURL + '/appointment/getAllCancelCount/');
    return data;
}

export const updateAppointmentState = async (details) => {
    const { data } = await axios.post(baseURL + '/appointment/updateAppointmentState/', details);
    return data;
}

export const appointmentReport = async (details) => {
    const { data } = await axios.post(baseURL + '/appointment/appointmentReport/', details);
    return data;
}

export const getActiveAppointmentByCustomer = async (details) => {
    const { data } = await axios.post(baseURL + '/appointment/getActiveAppointmentByCustomer/', details);
    return data;
}

