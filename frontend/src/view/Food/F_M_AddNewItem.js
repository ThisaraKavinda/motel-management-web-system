import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/F_M_Navbar";
import "../../css/modern.css";
// import "../../js/app.js";

import NewFoodPrices from '../../components/Food/NewFoodPrices.js';
import NewItemPrice from '../../components/Food/NewItemPrice.js';
import {getCategories, addFoodItem} from '../../controllers/food.js'

import Select from 'react-select';
import swal from 'sweetalert';
import axios from 'axios';
import { Lines, Sugar } from 'react-preloaders2';

export default function F_M_AddNewItem() {

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [regularPrice, setRegularPrice] = useState('');
    const [largePrice, setLargePrice] = useState('');
    const [familyPrice, setFamilyPrice] = useState('');
    const [specialPrice, setSpecialPrice] = useState('');
    const [image, setImage] = useState(null);

    const [isRegular, setIsRegular] = useState(true);
    const [isLarge, setIsLarge] = useState(false);
    const [isFamily, setIsFamily] = useState(false);
    const [isSpecial, setIsSpecial] = useState(false);
    const [isOtherSizes, setIsOtherSizes] = useState(true);

    const [categoryOptions, setCategoryOptions] = useState([]);

    const [loading, setLoading] = useState(false);

    const clearValue = () => {
        // window.location.reload();
    }

    const settingPrices = (regular, large, family, special, isRegular, isLarge, isFamily, isSpecial)=> {
        setRegularPrice(regular);
        setLargePrice(large);
        setFamilyPrice(family)
        setSpecialPrice(special);
        setIsRegular(isRegular);
        setIsLarge(isLarge);
        setIsFamily(isFamily);
        setIsSpecial(isSpecial);
    }

    const typeChangeHandler = async (event) => {
        await setType(event.value);
        setCategory("");
        
        await getCategories(event.value)
        .then((data) => {
            console.log(data)
            let categories = [];
            data.forEach((category) => {
                categories.push({ value: category.category, label: category.category })
            })
            categories.push({ value: "Other", label: "Other" })
            setCategoryOptions(categories)
        })
        .catch(err => {
            console.error(err);
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
        });

        if (event.value != "Foods") {
            setIsOtherSizes(false);
        } else {
            setIsOtherSizes(true);
            setIsRegular(true);
        }
    }

    async function addItem() {

        if (name === '' && type === '' && category === '') {
            swal("Enter the item details to proceed");
        } else if (name === '') {
            swal("Enter the name");
        } else if (type == "") {
            swal("Please select a type");
        } else if (category === '') {
            swal("Please select a category"); 
        } else if (isRegular && regularPrice === '') {
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
            const data = new FormData();
            data.append('name', name);
            data.append('type', type);
            data.append('category', category);
            data.append('regularPrice', regularPrice);
            isLarge ? data.append('largePrice', largePrice) : data.append('largePrice', '');
            isFamily ? data.append('familyPrice', familyPrice) : data.append('familyPrice', '');
            isSpecial ? data.append('specialPrice', specialPrice) : data.append('specialPrice', '');
            data.append('image', image);            
            data.append('availability', 'yes');
            if (image !== null) {
                swal({
                    title: "Info!",
                    text: "Please wait while your image is uploading to our servers",
                    icon: 'info',
                    timer: 3000,
                    button: false,
                });
            }
            await addFoodItem(data)
            .then(() =>{
                swal({
                    title: "Success!",
                    text: "New Item Add Successfully",
                    icon: 'success',
                    timer: 6000,
                    button: true,
                });
            })
            .catch((err) => {
                console.error(err);
                swal({
                    title: "Error!",
                    text: "Something went wrong when adding the item. Try reloading page",
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

    return (
        <React.Fragment>
        <div class="wrapper">
            <Navbar />
            <div class="main">
                <main class="content">
                    <div class="container-fluid">
                        <div class="header">
                            <h1 class="header-title">Add new item</h1>
                        </div>

                        <div class="col-md-12 mb-4">
                            <div class="card">
                                <div class="card-body mt-3 mb-2" style={{ margin: "0px" }}>

                                    <div class="row mb-2 px-4">
                                        <h5 class="fw-semibold">Submit the following form to add a new item</h5>
                                    </div>
                            
                                        <div class="row px-4 mb-2">
                                            <div class="mb-3 col-md-12">
                                                <label for="inputEmail4">Name</label>
                                                <input type="text" class="form-control"name="name" 
                                                onChange={(e) => {setName(e.target.value);}} value={name} />
                                            </div>
                                        </div>

                                        <div class="row px-4 d-flex justify-content-between mb-2">
                                            <div class="mb-3 col-md-6 mb-2 ml-2">
                                                <label for="type">Type</label>
                                                <Select
                                                isClearable
                                                isSearchable
                                                options={
                                                    [
                                                        { value: 'Foods', label: 'Foods' },
                                                        { value: 'Beverages', label: 'Beverages' },
                                                        { value: 'Desserts', label: 'Desserts' },
                                                    ]
                                                }
                                                onChange={typeChangeHandler}
                                                />
                                            </div>
                                            <div class="mb-3 col-md-6 mb-2">
                                                <label for="inputAddress">Category</label>
                                                <Select options={categoryOptions}
                                                onChange={(e) => {
                                                    setCategory(e.value);
                                                }}
                                                isSearchable
                                                />
                                            </div>
                                        </div>

                                        {isOtherSizes? <NewFoodPrices settingPrices={settingPrices}/> : <NewItemPrice settingPrices={settingPrices}/>}

                                        <div class="row px-4 d-flex justify-content-between mb-2">
                                            <div class="mb-3 col-md-12 mb-2 ml-2">
                                                <label for="formFile" class="form-label">Image</label>
                                                <input class="form-control" type="file" id="formFile" onChange={e => setImage(e.target.files[0])} />
                                            </div>                                            
                                        </div>   
                                                                                          
                                    <div class="row d-flex justify-content-center mb-2 mt-5">
                                        <div class="col-5 d-flex justify-content-center">
                                            <button class="btn btn-primary w-75 mx-5 py-2 fw-semibold"onClick={() => addItem()}>Add</button>
                                            <button class="btn btn-primary w-75 mx-3 py-2 fw-semibold"
                                                style={{ backgroundColor: '#ffffff', borderColor: '#081E3D', color: '#081E3D', marginLeft: 10, width:75 }} 
                                                onClick={clearValue}>Reset</button>
                                        </div>
                                    </div>

                                </div>
                                
                            </div>
                        </div>

                    </div>

                </main>
            </div>
        </div>
        <Sugar customLoading={loading} background="blur"/>
        </React.Fragment>
    );
}
