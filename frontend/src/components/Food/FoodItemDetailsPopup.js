import React, { useState, useEffect } from "react";

import "./FoodItemDetailsPopup.css"

import Switch from "react-switch";

import {editFood, deleteFood} from '../../controllers/food.js';

import swal from 'sweetalert';

export default function FoodItemDetailsPopup(props) {

    const [item, setItem] = useState(props.item);
    const [isRegular, setIsRegular] = useState(false);
    const [isLarge, setIsLarge] = useState(false);
    const [isFamily, setIsFamily] = useState(false);
    const [isSpecial, setIsSpecial] = useState(false);

    const [regularPrice, setRegularPrice] = useState("");
    const [largePrice, setLargePrice] = useState("");
    const [familyPrice, setFamilyPrice] = useState("");
    const [specialPrice, setSpecialPrice] = useState("");
    const [isAvailable, setIsAvailable] = useState(true);

    const [isEdit, setIsEdit] = useState(false);
    const [isRegularEdit, setIsRegularEdit] = useState(false);
    const [isLargeEdit, setIsLargeEdit] = useState(false);
    const [isFamilyEdit, setIsFamilyEdit] = useState(false);
    const [isSpecialEdit, setIsSpecialEdit] = useState(false);

    useEffect(() => {
        setItem(props.item);
        if (!props.item.regularPrice == "") {
            setIsRegular(true);
            setRegularPrice(props.item.regularPrice)
        }
        if (!props.item.largePrice == "") {
            setIsLarge(true);
            setLargePrice(props.item.largePrice)
        }
        if (!props.item.familyPrice == "") {
            setIsFamily(true);
            setFamilyPrice(props.item.familyPrice)
        }
        if (!props.item.specialPrice == "") {
            setIsSpecial(true);
            setSpecialPrice(props.item.specialPrice)
        }
        if (props.item.availability == "yes") {
            setIsAvailable(true);
        } else {
            setIsAvailable(false);
        }
    }, [props.item])

    const closeOnClickHandler = () => {
        props.closeOnClickHandler();
    }

    const onRegularEdit = () => {
        setIsRegularEdit(true);
        setIsLargeEdit(false);
        setIsFamilyEdit(false);
        setIsSpecialEdit(false);
        setIsEdit(true);
    }

    const onLargeEdit = () => {
        setIsRegularEdit(false);
        setIsLargeEdit(true);
        setIsFamilyEdit(false);
        setIsSpecialEdit(false);
        setIsEdit(true);
    }

    const onFamilyEdit = () => {
        setIsRegularEdit(false);
        setIsLargeEdit(false);
        setIsFamilyEdit(true);
        setIsSpecialEdit(false);
        setIsEdit(true);
    }
    
    const onSpecialEdit = () => {
        setIsRegularEdit(false);
        setIsLargeEdit(false);
        setIsFamilyEdit(false);
        setIsSpecialEdit(true);
        setIsEdit(true);
    }

    const onCancelEdit = () => {
        setIsEdit(false);
        setIsRegularEdit(false);
        setIsLargeEdit(false);
        setIsFamilyEdit(false);
        setIsSpecialEdit(false);
        setRegularPrice(item.regularPrice);
        setLargePrice(item.largePrice);
        setFamilyPrice(item.familyPrice);
        setSpecialPrice(item.specialPrice);
        setIsAvailable(item.availability);
    }

    const onChangeAvailability = () => {
        setIsAvailable(!isAvailable);
        setIsEdit(true);
    }

    const OnUpdate = () => {
        if (isRegular && regularPrice === '') {
            swal("Please enter the Regular price"); 
        }else if (isRegular && isNaN(regularPrice)) {
            swal("Please enter a valid regular price"); 
        }else if (isLarge && largePrice === '') {
            swal("Please enter the Large price"); 
        }else if (isLarge && isNaN(largePrice)) {
            swal("Please enter a valid Large price"); 
        }else if (isFamily && familyPrice === '') {
            swal("Please enter the Family price"); 
        }else if (isFamily && isNaN(familyPrice)) {
            swal("Please enter a valid Family price"); 
        }else if (isSpecial && specialPrice === '') {
            swal("Please enter the Special price"); 
        }else if (isSpecial && isNaN(specialPrice)) {
            swal("Please enter a valid Special price"); 
        } else {
            editFood(item.id, regularPrice, largePrice, familyPrice, specialPrice, isAvailable)
            .then((result) => {
                if (result.status == "Item updated") {
                    setIsEdit(false);
                    setIsRegularEdit(false);
                    setIsLargeEdit(false);
                    setIsFamilyEdit(false);
                    setIsSpecialEdit(false);
                    swal({
                        title: "Success!",
                        text: "Item updated successfully",
                        icon: 'success',
                        timer: 2000,
                        button: false,
                    });
                        setTimeout(() => {
                        window.location.reload(true);
                    },  2000)
                } else  {
                    swal({
                        title: "Error!",
                        text: "Something went wrong went wrong. Try again",
                        icon: 'error',
                        dangerMode: true,
                        button: false,
                    })
                }
            })
            .catch ((err) => {
                swal({
                    title: "Error!",
                    text: "Something went wrong with the network. Try reloading page",
                    icon: 'error',
                    dangerMode: true,
                    button: true,
                })
                .then((reload) => {
                    window.location.reload();
                });
            })
        }        
    }

    const onDelete = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this item!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                deleteFood(item.id)
                .then((result) => {
                    if (result.status == "Item deleted") {
                        setIsEdit(false);
                        setIsRegularEdit(false);
                        setIsLargeEdit(false);
                        setIsFamilyEdit(false);
                        setIsSpecialEdit(false);
                        swal({
                            title: "Success!",
                            text: "Item deleted successfully",
                            icon: 'success',
                            timer: 20000,
                            button: true,
                        })
                        .then ((reload) => {
                            window.location.reload();
                        })
                    } else {
                        swal({
                            title: "Error!",
                            text: "Something went wrong went wrong. Try again",
                            icon: 'error',
                            dangerMode: true,
                            button: false,
                        })
                    }
                })
                .catch ((err) => {
                    swal({
                        title: "Error!",
                        text: "Something went wrong with the network. Try reloading page",
                        icon: 'error',
                        dangerMode: true,
                        button: true,
                    })
                    .then((reload) => {
                        if (reload) {
                            window.location.reload();
                        }
                    });
                })
            } else {
                swal("Item is safe!");
            }
        });
    }

    return (
        <div class="card border bg-light w-40 shadow" style={{position:'fixed', bottom:'10%', right:'25%', zIndex:1,  }}>
            <div class="row d-flex justify-content-end">
                <div class="col-1 mt-3 mx-4 d-flex justify-content-end">
                    <button type="button" class="btn-close" aria-label="Close" onClick={closeOnClickHandler}></button>
                </div>
            </div>
            <div class="row d-flex justify-content-center">
                <div class="col-10 my-2 mx-4" >
                    <img src={item.image} class="img-fluid img-thumbnail" style={{width: "500px"}}></img>
                </div>
            </div>
            <div class="row d-flex justify-content-center">
                <div class="col-auto" >
                    <h5 class="fw-semibold monospace mb-1">{item.name} </h5>
                </div>
            </div>
            <div class="row d-flex justify-content-center">
                <div class="col-auto" >
                    <p class="fw-semibold monospace mb-2">Category: {item.category} </p>
                </div>
            </div>

            <div class="row d-flex justify-content-start">
                <div class="col-6 mb-1 mx-5 d-flex align-items-center" >
                    <Switch onChange={onChangeAvailability} checked={isAvailable} />
                    {isAvailable ? <p class="fw-semibold monospace mb-0 mx-3 text-success"> Available </p> : 
                    <p class="fw-semibold monospace mb-0 mx-3 text-danger">Not Available </p>}
                </div>                
            </div>

            <div class="row d-flex justify-content-start">
                <div class="col-auto my-1 mx-5 mt-2" >
                    <p class="fw-semibold monospace mb-0">Click on a portion to edit the price </p>
                </div>
            </div>

            <div class="row d-flex justify-content-center">
                <div class="col-auto mt-1 mb-3" >
                    
                    {(isRegular) ? (<jsx>
                    <button class="btn btn-light mx-2 px-3 border" for="option1" onClick={onRegularEdit}>
                        <div class="row">
                            <h5 class="monospace mb-1">Regular</h5>
                        </div>
                        <div class="row d-flex justify-content-center">
                            {isRegularEdit && (<input class="mb-0 fw-6 monospace price-input" style={{ maxWidth: "85px"}} 
                            onChange={(e) => setRegularPrice(e.target.value)} value={regularPrice}/>)}
                            {!isRegularEdit && (<p class="mb-0 fw-6 monospace dw-semibold"> Rs. {regularPrice}</p>)}
                        </div>
                    </button></jsx>) : null }

                    {(isLarge) ? (<jsx>
                    <button class="btn btn-light mx-2 px-3 border" for="option2" onClick={onLargeEdit}>
                        <div class="row">
                            <h5 class="monospace mb-1">Large</h5>
                        </div>
                        <div class="row d-flex justify-content-center">
                            {isLargeEdit && (<input class="mb-0 fw-6 monospace price-input" style={{ maxWidth: "85px"}} 
                            onChange={(e) => setLargePrice(e.target.value)} value={largePrice}/>)}
                            {!isLargeEdit && (<p class="mb-0 fw-6 monospace dw-semibold"> Rs. {largePrice}</p>)}
                        </div>
                    </button></jsx>) : null }

                    {(isFamily) ? (<jsx>
                    <button class="btn btn-light mx-2 px-3 border" for="option3" onClick={onFamilyEdit}>
                        <div class="row">
                            <h5 class="monospace mb-1">Family</h5>
                        </div>
                        <div class="row d-flex justify-content-center">
                            {isFamilyEdit && (<input class="mb-0 fw-6 monospace price-input" style={{ maxWidth: "85px"}} 
                            onChange={(e) => setFamilyPrice(e.target.value)} value={familyPrice}/>)}
                            {!isFamilyEdit && (<p class="mb-0 fw-6 monospace dw-semibold"> Rs. {familyPrice}</p>)}
                        </div>
                    </button></jsx>) : null }

                    {(isSpecial) ? (<jsx>
                    <button class="btn btn-light mx-2 px-3 border" for="option4" onClick={onSpecialEdit}>
                        <div class="row">
                            <h5 class="monospace mb-1">Special</h5>
                        </div>
                        <div class="row d-flex justify-content-center">
                            {isSpecialEdit && (<input class="mb-0 fw-6 monospace price-input" style={{ maxWidth: "85px"}} 
                            onChange={(e) => setSpecialPrice(e.target.value)} value={specialPrice}/>)}
                            {!isFamilyEdit && (<p class="mb-0 fw-6 monospace dw-semibold"> Rs. {specialPrice}</p>)}
                        </div>
                    </button></jsx>) : null }
                    

                </div>
            </div>
            <div class="row d-flex justify-content-center mt-2 mb-3">
                {isEdit ? (<div class="col-5 d-flex justify-content-center">
                    <button class="btn btn-primary mx-4 py-2 px-4 fw-semibold"
                        style={{ backgroundColor: '#ffffff', borderColor: '#081E3D', color: '#081E3D'}}
                        onClick={onCancelEdit}>Cancel</button>
                    <button class="btn btn-primary mx-4 py-2 px-3 fw-semibold" onClick={OnUpdate}>Update</button>
                </div>) 
                : (<div class="col-5 d-flex justify-content-center">
                    <button class="btn btn-danger mx-4 py-2 px-3 fw-semibold" onClick={onDelete}>Delete</button>
                </div>) }
            </div>
        </div>
    )
}