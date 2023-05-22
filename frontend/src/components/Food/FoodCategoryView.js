import React, { useState, useEffect } from "react";

import './FoodCategoryView.css';

export default function FoodCategoryView(props) {

    const [id, setId] = useState(props.id);
    const [category, setCategory] = useState(props.category)
    const [items, setItems] = useState(props.items);

    // console.log(props.category)
    // console.log(props.items);

    useEffect(() => {
        setCategory(props.category)
        let arr= [];
        props.items.forEach(item => {
            if (item.category == category) {
                // item.image = onGetCroppedImage(item.image);
                arr.push(item);
            }
        });
        setItems(arr);
        setId(props.id);
    }, [props.items, props.category, props.id])

    
    const addOnClickHandler = (value) => {
        props.viewOnClickHandler(value.name, value.image, value.category, value.regularPrice, value.largePrice, value.familyPrice, value.specialPrice, value.availability, value._id);   
    }

    const onGetCroppedImage = (image) => {
        let imageArr = image.split("/image/upload/");
        let newImage = imageArr[0] + "/image/upload/ar_1.3,c_crop/" + imageArr[1];
        return newImage
    }


    return (
        <div class="col-md-12">
            <div class="card">
                     <div class="card-header" id="headingOne" data-bs-toggle="collapse" data-bs-target={`#${id}`} aria-expanded="true" aria-controls={id}>
                    <div class="card-title my-2 d-flex justify-content-between mb-0">
                        <h5 class="fs-bold mb-0">
                            { category}
                        </h5>
                        <h5 class="" style={{textAlign:'end'}}>
                                <i class="align-middle fas fa-fw fa-angle-down" ></i>
                        </h5>
                    </div>       
                </div>
                <div id={id} class="collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample" >
                    <div class="card-body mb-0">
                        <div class="row">

                        
                            
                        {items.map((value, index) =>  (
                            <div class="col-12 col-md-6 col-lg-3 px-3">
                                <div class="card foodItem" onClick={addOnClickHandler.bind(this, value)}>
                                    {/* <button type="button" class="btn btn-primary" style={{position:'absolute', top:'40%', right:'40%'}}
                                    onClick={addOnClickHandler.bind(this, value)}>
                                        Add
                                    </button> */}
                                    <img class="card-img-top overlay" src={onGetCroppedImage(value.image)} alt="Unsplash" id="foodItemImage" />
                                    <div class="card-header text-center justify-content-center">
                                        <h5 class="card-title mb-0 fs-5 fw-semibold">{value.name}</h5>
                                        <p class="card-title mb-0 font-monospace">Rs. {value.regularPrice}</p>
                                    </div>
                                    
                                </div>
                            </div>
                        ))}

                        </div>
                    </div>
                </div>
            </div>     
        </div>
    )
}