import axios from 'axios';

// Config
import { baseURL } from '../config';

export const addRoom = async (details) => {
    const { data } = await axios.post(baseURL + '/room/add/', details);
    return data;
}

export const getRooms = async () => {
    const { data } = await axios.get(baseURL + '/room/getRooms/');
    return data;
}

export const getAllRooms = async () => {
    const { data } = await axios.get(baseURL + '/room/getAllRooms/');
    return data;
}

export const updateRoomState = async (details) => {
    const { data } = await axios.post(baseURL + '/room/updateRoomState/', details);
    return data;
}

export const updateRoomStateDone = async (details) => {
    const { data } = await axios.post(baseURL + '/room/updateRoomStateDone/', details);
    return data;
}

export const getRoomBill = async (details) => {
    const { data } = await axios.post(baseURL + '/room/getRoomBill/', details);
    return data;
}