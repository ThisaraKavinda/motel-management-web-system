import {Food} from '../models/food.js';

export const addFood = async (req, res) => {
    // console.log(req.body);
    // console.log(req.file);

    const name = req.body.name;
    const category = req.body.category;
    const type = req.body.type;
    const regularPrice = req.body.regularPrice;
    const largePrice = req.body.largePrice;
    const familyPrice = req.body.familyPrice;
    const specialPrice = req.body.specialPrice;
    let image = "";
    if (req.file !== undefined) {
        image = req.file.path
    }
    const availability = "yes"

    let newFood = new Food({
        name, category, type, regularPrice, largePrice, familyPrice, specialPrice, image, availability
    })

    newFood = await newFood.save().then(() =>{
        res.send(newFood);
    }).catch(err => {
        console.error(err);
    })
}

export const getAllFoods = async (req, res) => {
    Food.find().then((food)=>{
        res.send(food)
    }).catch((err)=>{
        console.log(err);
    })
}

export const getNumOfFoods = async (req, res) => {
    Food.find().then((food)=>{
        let response = {num: food.length}
        res.send(response)
    }).catch((err)=>{
        console.log(err);
    })
}

export const getFoods = async (req, res) => {
    const type = req.params.type;
    Food.find({type: type}).then((food)=>{
        res.send(food)
    }).catch((err)=>{
        console.log(err);
    })
}

export const deleteFood = async (req, res) => {
    const id = req.params.id;
    await Food.findByIdAndDelete(id).then(()=>{
        res.status(200).send({status:"Item deleted"});
    }).catch((errr)=>{
        console.log(errr.message);
        res.status(500).send({status: "Error with deleting item"})
    })    
}

export const editFood = async (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    const {regularPrice,largePrice, familyPrice, specialPrice, availability}=req.body;

    let oldItem = await Food.findById(id);
    const name = oldItem.name;
    const category = oldItem.category;
    const type = oldItem.type;
    const image = oldItem.image;

    const updateItem={
        name, category, type, regularPrice, largePrice, familyPrice, specialPrice, image, availability
    }
    const update = await Food.findByIdAndUpdate(id,updateItem).then (async()=>{
        res.status(200).send({status: "Item updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message})
    })
    console.log(update);
}