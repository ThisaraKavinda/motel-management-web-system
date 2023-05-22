import axios from 'axios';

// Config
import { baseURL } from '../config';

export const getCategories = async (type) => {
    console.log(baseURL )
    const { data } = await axios.get(baseURL + '/food/getCategories/' + type);
    return data;
}

export const addFoodItem = async (details) => {
    const { data } = await axios({
        method: "post",
        url: baseURL + '/food/add',
        data: details,
        headers: { "Content-Type": "multipart/form-data" },
    })
    return data;
}

export const getNumOfFoods = async () => {
    const { data } = await axios.get(baseURL + '/food/getNumOfFoods');
    return data.num;
}

export const getAllFoods = async () => {
    const { data } = await axios.get(baseURL + '/food/getAllFoods');
    return data;
}

export const getFoods = async (type) => {
    const { data } = await axios.get(baseURL + '/food/getFoods/' + type);
    return data;
}

export const editFood = async (id, regularPrice, largePrice, familyPrice, specialPrice, isAvailable) => {
    let availability = "yes";
    if (!isAvailable)
        availability = "no";
    let newItem = {
        regularPrice: regularPrice, 
        largePrice: largePrice, 
        familyPrice: familyPrice,
        specialPrice: specialPrice,
        availability: availability
    }
    const { data } = await axios.post(baseURL + '/food/editFood/' + id, newItem);
    return data;
}

export const deleteFood = async (id) => {
    const { data } = await axios.get(baseURL + '/food/deleteFood/' + id);
    return data;
}