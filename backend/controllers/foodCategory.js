import {FoodCategory} from '../models/foodCategory.js';

export const getCategories = async (req, res) => {
    const type = req.params.type;
    if (type === 'All' || type =="") {
        await FoodCategory.find().then((category)=>{
            res.send(category)
        }).catch((err)=>{
            console.log(err);
        })
    } else {
        await FoodCategory.find({type: type}).then((category)=>{
            res.send(category)
        }).catch((err)=>{
            console.log(err);
        })
    }
    
}