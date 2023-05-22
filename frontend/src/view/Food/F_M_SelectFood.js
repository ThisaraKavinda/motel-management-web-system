import React, { useState, useEffect } from "react";
import { useParams, useNavigate} from 'react-router-dom';
import Navbar from "../../components/F_M_Navbar";
import "../../css/modern.css";
// import "../../js/app.js";
import "./F_M_SelectFood.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { Sugar } from 'react-preloaders2';
import swal from 'sweetalert';

import {getAllFoods, getFoods} from '../../controllers/food.js';
import {addAllCartItems} from '../../controllers/foodCart.js';
import {getSelectedAppointment} from '../../controllers/appointment';
import FoodCategory from '../../components/Food/FoodCategory.js';
import FoodItemPopup from '../../components/Food/FoodItemPopup.js'

import bin from '../../img/icons/trash.png';


export default function F_M_SelectFood() {

    let navigate = useNavigate(); 

    const {id} = useParams();
    if (id == null) {
        swal({
            title: "Select a room!",
            text: "Fist select a room to proceed",
            icon: 'info',
            dangerMode: true,
            button: true,
        }).then((ok) => {
            let path  = "/roomSelect/";
            navigate(path);
        })
    }

    const [nic, setNic] = useState("")

    const [categories, setCategories] = useState([])
    const [allFoodItems, setAllFoodItems] = useState([])
    const [foodItems, setFoodItems] = useState([])
    const [beverageItems, setBeverageItems] = useState([]);
    const [desertItems, setDesertItems] = useState([]);
    const [displayingItems, setDisplayingItems] = useState([]);

    const [popupItem, setPopupItem] = useState({});
    const [isPopupActive, setIsPopupActive] = useState(false);

    const [cartItems, setCartItems] = useState([]);
    const [numCartItems, setNumCartItems] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    const [searchTerm, setSearchTerm] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSelectedAppointment(id).then((res) => {
            // console.log(res);
            setNic(res.nic);
        })
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

    const viewOnClickHandler = async (name, image, category, regularPrice, largePrice, familyPrice, specialPrice,availability, id) => {
        // console.log(id);
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

    const addItemToCart = async (item, price) => {
        console.log(item)
        await setNumCartItems(numCartItems + 1);
        await setCartItems(cartItems => [...cartItems, {item:item, price:price }]);
        await setCartTotal(parseInt(cartTotal) + parseInt(price))
        console.log(price);
    }

    const onDeleteItemCart = async (index) => {
        console.log(index);
        await setNumCartItems(numCartItems - 1);
        let newCartItem = [];
        let removedItem;
        for (let i=0; i<cartItems.length; i++){
            if (i== index) {
                removedItem = cartItems[i];
                continue;
            }else 
                newCartItem.push(cartItems[i])
        }
        setCartItems(newCartItem);
        await setCartTotal(parseInt(cartTotal) - parseInt(removedItem.price))
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

    const onProceed = () => {
        if (cartItems.length <= 0) {
            swal({
                title: "Select a food!",
                text: "Fist select food items to proceed",
                icon: 'info',
                dangerMode: true,
                button: true,
            })
        } else {
            addAllCartItems(cartItems, id, nic).then((res) => {
                navigate("/orderPlaced/" + res)
            });
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
                        <h1 class="header-title">Make an Order</h1>
                    </div>
                    <div class="col-md-12 mb-4">
                        <div class="card">
                            <div class="card-body mt-3 mb-2" style={{ margin: "0px" }}>

                                <div class="row mb-2">
                                    <h5 class="fw-semibold">Select the foods</h5>
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

                                    <div class="col-2 mx-4 px-3">

                                        <Popup trigger={
                                            <button type="button" class="btn btn-primary w-100 ">
                                                <div class="row">
                                                    <div class="col-7 px-3 d-flex justify-content-end">
                                                        <p class="text-light mb-0 fw-bold">{numCartItems} items</p>
                                                    </div>
                                                    <div class="col-4 px-3">
                                                        <i class="fas fa-shopping-cart"></i>
                                                    </div>
                                                </div>
                                            </button> } >
                                            <div class="container border shadow px-4 py-3 bg-light" style={{width: "360px", position: "absolute", right: "1px", zIndex:1}}>
                                                <div class="row d-flex justify-content-between align-items-center mb-2">
                                                    <div class="col-8">
                                                        <h5 class="fw-semibold monospace">Cart</h5>
                                                    </div>
                                                    <div class="col-auto">
                                                        <h5 class="fw-semibold monospace fs-6">{numCartItems} items</h5>
                                                    </div>
                                                </div>

                                                <div style={{maxHeight: "300px", overflowY: "auto", overflowX: "hidden"}}>

                                                {cartItems.map((value, index) => ( 

                                                    <div class="row d-flex justify-content-between align-items-center mb-2">
                                                        <div class="col-4">
                                                            <img src={value.item.image} class="img-fluid img-thumbnail"></img>
                                                        </div>
                                                        <div class="col-6  align-items-center">
                                                            <div class="row">
                                                                <h5 class="fw-semibold monospace fs-6 mb-0">{value.item.name}</h5>
                                                            </div>
                                                            <div class="row">
                                                                <p class=" monospace mb-0" style={{fontSize: "13px"}}>Rs. {value.price}</p>
                                                            </div>
                                                        </div>
                                                        <div class="col-2">
                                                            <img src={bin} class="img-fluid mb-1 p-1" onClick={onDeleteItemCart.bind(this, index)}></img>
                                                        </div>
                                                    </div>

                                                ))}

                                                </div>

                                                <div class="row d-flex justify-content-between align-items-center mt-4">
                                                    <div class="col-5">
                                                        <h5 class="fw-semibold monospace fs-6">Total</h5>
                                                    </div>
                                                    <div class="col-auto">
                                                        <h5 class="fw-semibold monospace fs-6">Rs. {cartTotal}.00</h5>
                                                    </div>
                                                </div>
                                                <div class="row d-flex justify-content-center align-items-center mt-4">
                                                    <div class="col-5 d-flex justify-content-center">
                                                        <button class="btn btn-primary fw-bold" onClick={onProceed}>Proceed</button>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </Popup>
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
                        <FoodCategory category={category} items={displayingItems} id={"collapseOne" + index} viewOnClickHandler={viewOnClickHandler}/>
                    ))}
                    
                </div>

                {/* <button class="btn btn-primary py-2 px-4 fw-bold fs-6" style={{position:'fixed', bottom:'12%', right:'5%'}}>Proceed</button> */}

                {isPopupActive ? <FoodItemPopup item={popupItem} closeOnClickHandler={closeOnClickHandler} addItemToCart={addItemToCart}/> : null}

                
            </main>
        </div>
        </div>
        <Sugar customLoading={loading} background="blur"/>
        </React.Fragment>
    );
}
