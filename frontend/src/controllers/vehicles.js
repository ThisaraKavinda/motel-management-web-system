import axios from 'axios';

// Config
import { baseURL } from '../config';

export const addVehicle = async (details) => {
    const { data } = await axios.post(baseURL + '/vehicle/add/', details);
    return data;
}

export const getAllVehicles = async () => {
  const { data } = await axios.get(baseURL + "/vehicle/getAllVehicles/");
  return data;
};

export const deleteVehicle = async (id) => {
  const { data } = await axios.post(baseURL + "/vehicle/delete/", { id: id });
  return data;
};

export const editVehicle = async (details) => {
  const { data } = await axios.post(baseURL + "/vehicle/edit/", details);
  return data;
};

export const getSelectedVehicle = async (id) => {
  const { data } = await axios.post(baseURL + "/vehicle/getSelectedVehicle/", {
    id: id,
  });
  return data;
};

export const getAllVehicleCount = async () => {
    const { data } = await axios.get(baseURL + '/vehicle/getAllVehicleCount/');
    return data;
}

export const getAllVehicleAvailableCount = async () => {
  const { data } = await axios.get(baseURL + '/vehicle/getAllAvailableCount/');
  return data;
}

export const getAllVehicleDrivingCount = async () => {
  const { data } = await axios.get(baseURL + '/vehicle/getAllDrivingCount/');
  return data;
}

export const getAllVehicleRepairCount = async () => {
  const { data } = await axios.get(baseURL + '/vehicle/getAllRepairCount/');
  return data;
}


export const getAllavalable = async () => {
    const { data } = await axios.get(baseURL + '/vehicle/getAllavalable/');
    return data;
}

export const editVehicleState = async (id) => {
  const { data } = await axios.post(baseURL + '/vehicle/editVehcleState/', {id: id});
  return data;
}

export const editVehicleState2 = async (id) => {
  console.log(id + "ssdsd");
  const { data } = await axios.post(baseURL + '/vehicle/editVehcleState2/', {id: id});
  return data;
}
