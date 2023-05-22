import React, { useState, useEffect } from "react";
import Navbar from "../../components/F_M_Navbar";
import "../../css/modern.css";
// import "../../js/app.js";
import "./F_M_SelectFood.css";
import 'reactjs-popup/dist/index.css';

import { Sugar } from 'react-preloaders2';
import swal from 'sweetalert';

import {getAllFoods, getFoods, editFood} from '../../controllers/food.js';
import FoodCategoryView from '../../components/Food/FoodCategoryView.js';
import FoodItemDetailsPopup from '../../components/Food/FoodItemDetailsPopup.js'

export default function F_M_FoodItemList() {

    const [categories, setCategories] = useState([])
    const [allFoodItems, setAllFoodItems] = useState([])
    const [foodItems, setFoodItems] = useState([])
    const [beverageItems, setBeverageItems] = useState([]);
    const [desertItems, setDesertItems] = useState([]);
    const [displayingItems, setDisplayingItems] = useState([]);

    const [popupItem, setPopupItem] = useState({});
    const [isPopupActive, setIsPopupActive] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getFoods("Foods").then((result) => {
            console.log(result);
            setFoodItems(result);
            setDisplayingItems(result);
            setCategoriesState(result);
        });
        getFoods("Beverages").then((result) => {
            setBeverageItems(result);
        })
        getFoods("Desserts").then((result) => {
            setDesertItems(result);
        })
        getAllFoods().then((result) => {
            setAllFoodItems(result);
        })
        .catch((err) => {
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
        .then ((result) => {
            result.json()
        })
        .then(json => {
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
        });
    }, [])

    const setCategoriesState = async (arr) =>{
        await setCategories([]);
        let categoiesArr = [];
        arr.forEach((item) => {
            if (!categoiesArr.includes(item.category)) {
                categoiesArr.push(item.category)
            }
        })
        console.log(categoiesArr);
        await setCategories(categoiesArr);
    }

    const viewOnClickHandler = async (name, image, category, regularPrice, largePrice, familyPrice, specialPrice, availability, id) => {
        console.log(id);
        await setPopupItem({
            name: name,
            image: image,
            category: category,
            regularPrice: regularPrice,
            largePrice: largePrice,
            familyPrice: familyPrice,
            specialPrice: specialPrice,
            availability: availability,
            id: id
        })
        await setIsPopupActive(true);
    }

    const closeOnClickHandler = async () => {
        await setPopupItem({});
        await setIsPopupActive(false)
    }

    const onClickFoodsHandler = (event) => {
        // console.log(event.target.checked);
        setDisplayingItems(foodItems);
        setCategoriesState(foodItems);
        setSearchTerm("");
    }

    const onClickBeveragesHandler = (event) => {
        // console.log(event.target.checked);
        setDisplayingItems(beverageItems);
        setCategoriesState(beverageItems);
        setSearchTerm("");
    }

    const onClickDesertsHandler = (event) => {
        // console.log(event.target.checked);
        setDisplayingItems(desertItems);
        setCategoriesState(desertItems);
        setSearchTerm("");
    }

    const onSearch = () => {
        console.log(searchTerm);
        let newItemList = []
        allFoodItems.forEach((item) => {
            let category = "" + item.category.toLowerCase();
            let name = "" + item.name.toLowerCase();
            if (name.includes(searchTerm.toLowerCase()) || category.includes(searchTerm.toLowerCase())) {
                newItemList.push(item);
            }
        })
        setDisplayingItems(newItemList);
        setCategoriesState(newItemList);
    }

    return (
        <React.Fragment>
        <div class="wrapper">
        <Navbar />
        <div class="main">
            <main class="content">
                <div class="container-fluid">
                
                    <div class="header">
                        <h1 class="header-title">Item List</h1>
                    </div>
                    <div class="col-md-12 mb-4">
                        <div class="card">
                            <div class="card-body mt-3 mb-2" style={{ margin: "0px" }}>

                                <div class="row mb-2">
                                    <h5 class="fw-semibold">All items in the system displayed here</h5>
                                </div>

                                <div class="row d-flex justify-content-between mb-4">

                                    <div class="col-6">
                                        <form class="d-flex" role="search">
                                            <input class="form-control me-2" type="search" placeholder="Search by Name, Category" aria-label="Search" 
                                            onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm}/>
                                            <button type="button" class="btn btn-primary" onClick={onSearch}>
                                                <i class="fas fa-search"></i>
                                            </button>
                                        </form>
                                    </div>
                                </div>

                                <div class="row d-flex justify-content-between">
                                    <div class="col-5">

                                        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                            <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" 
                                            defaultChecked  onClick={onClickFoodsHandler}/>
                                            <label class="btn btn-outline-primary px-4" for="btnradio1">Food</label>

                                            <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off"
                                            onClick={onClickBeveragesHandler} />
                                            <label class="btn btn-outline-primary px-4" for="btnradio2">Beverages</label>

                                            <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off"
                                            onClick={onClickDesertsHandler} />
                                            <label class="btn btn-outline-primary px-4" for="btnradio3">Desserts</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    {categories.map((category, index) => ( 
                        <FoodCategoryView category={category} items={displayingItems} id={"collapseOne" + index} viewOnClickHandler={viewOnClickHandler} />
                    ))}
                    
                </div>

                {isPopupActive ? <FoodItemDetailsPopup item={popupItem} closeOnClickHandler={closeOnClickHandler}/> : null} 
            </main>
        </div>
        </div>
        <Sugar customLoading={loading} background="blur"/>
        </React.Fragment>
    );
}
