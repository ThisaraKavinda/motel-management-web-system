import axios from 'axios';

// Config
import { baseURL } from '../config';

export const addEmployee = async (details) => {
    const { data } = await axios.post(baseURL + '/employee/add/', details);
    return data;
}

export const getAllEmployees = async () => {
    const { data } = await axios.get(baseURL + '/employee/getAllEmployees/');
    return data;
}

export const deleteEmployee = async (id) => {
    const { data } = await axios.post(baseURL + '/employee/delete/', {id: id});
    return data;
}

export const editEmployee = async (details) => {
    const { data } = await axios.post(baseURL + '/employee/edit/', details);
    return data;
}

export const getSelectedEmployee = async (id) => {
    console.log("asadasds")
    const { data } = await axios.post(baseURL + '/employee/getSelectedEmployee/', {id: id});
    console.log(data)
    return data;
}

export const getAllEmployeesCount = async () => {
    const { data } = await axios.get(baseURL + '/employee/getAllEmployeesCount/');
    return data;
}

export const getAllVehicleEmployeesCount = async () => {
    const { data } = await axios.get(baseURL + '/employee/getAllVehicleEmployeesCount/');
    return data;
}

export const getAllChefCount = async () => {
    const { data } = await axios.get(baseURL + '/employee/getAllCheffsCount/');
    return data;
}

export const getAllKetchenHCount = async () => {
    const { data } = await axios.get(baseURL + '/employee/getAllKitchenHCount/');
    return data;
}

export const getAllWaitersCount = async () => {
    const { data } = await axios.get(baseURL + '/employee/getAllWaitersHCount/');
    return data;
}

export const getAllReceptionistsCount = async () => {
    const { data } = await axios.get(baseURL + '/employee/getAllReceptionistsHCount/');
    return data;
}

export const getAllOfficeSCount = async () => {
    const { data } = await axios.get(baseURL + '/employee/getAllOfficeSCount/');
    return data;
}

export const getAllContractBaseCount = async () => {
    const { data } = await axios.get(baseURL + '/employee/getAllContractBaseCount/');
    return data;
}


export const getAllDrivers = async () => {
    const { data } = await axios.get(baseURL + '/employee/getDrivers/');
    return data;
}

export const logIn = async (details) => {
    const { data } = await axios.post(baseURL + '/employee/logIn/', details);
    return data;
}

export const getAllEmployeesType = async (type) => {
    const { data } = await axios.get(baseURL + '/employee/getAllEmployeesType/' + type );
    return data;
}
