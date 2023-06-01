import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/F_M_Navbar";
import "../../css/modern.css";
// import "../../js/app.js";
import './F_M_Dashboard.css';

import { Line , PolarArea, Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
import pattern from 'patternomaly';
import { Sugar } from 'react-preloaders2';
import swal from 'sweetalert';

import orderFood from "../../img/icons/fmOrderFood.png";
import ordersImage from "../../img/icons/fmOrders.png";
import moneyImage from "../../img/icons/fmMoney.png";
import foodsImage from "../../img/icons/fmFoods.png";
import dietImage from '../../img/icons/fmDiet.png'
import beverageImage from '../../img/icons/fmBeverages.png'
import desertImage from '../../img/icons/fmCake.png';
import boxImage from '../../img/icons/fmBox.png';
import fastFoodImage from '../../img/icons/fmFastfood.png';

import {getNumOfFoods} from '../../controllers/food';
import {getOrdersCountForAMonth, getRevenueForAMonth, getRevenueList} from '../../controllers/foodCart'

export default function F_M_Dashboard() {

    const navigate = useNavigate();

    Chart.register(CategoryScale);

    const [monthName, setMonthName] = useState("");
    const [month, setMonth] = useState(0);

    const [foodCount, setFoodCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [revenueList, setRevenueList] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const nameOfMonth = new Date().toLocaleString('default', {
            month: 'long',
        });
        setMonthName(nameOfMonth)
        let month = new Date().getMonth() + 1;
        setMonth(month)
        getNumOfFoods().then((res) => {
            setFoodCount(res);
        })
        getOrdersCountForAMonth(month).then((res) => {
            if (res.length < 10) {
                setOrderCount("0" + res.length)
            } else 
                setOrderCount(res.length)
        })
        getRevenueForAMonth(month).then((res) => {
            let revenueInK = Number(res.revenue) / 1000;
            revenueInK = Math.round(revenueInK * 10) / 10;
            setRevenue(revenueInK);
        })
        getRevenueList().then((res) => {
            setRevenueList(res);
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

    const onMakeOrder = () => {
        navigate("/roomSelect");
    }

    const onSeeAll = () => {
        navigate("/foodItemList");
    }

    return (
        <React.Fragment>
        <div class="wrapper">
        <Navbar />
        <div class="main">
            <main class="content">
            <div class="container-fluid">
                <div class="header">
                <h1 class="header-title">Dashboard</h1>
                </div>

                <div class="col-md-12" >
                <div class="card" style={{marginRight: "40px"}}>
                    <div class="card-body mt-3" style={{ margin: "0px" }}>
                    <div class="row">
                        <div class="col-md-7 px-5">
                        <div class="row fs-2">
                            <h3 class="mb-2">Hello Thisara!</h3>
                        </div>
                        <div class="row fs-6">
                            <h5 class="mb-0">Food & Beverage Manager</h5>
                        </div>
                        <div class="row">
                            <p class="mb-2">Login Time: 06:56pm </p>
                        </div>
                        <div class="row">
                            <a href="/">
                            <p class="mb-2">Logout</p>
                            </a>
                        </div>
                        </div>
                        <div class="col-md-5">
                        <div class="row m-3 h-75">
                            <a>
                            <div class="container-12 mx-6 d-flex justify-content-center align-items-center h-100 rounded" 
                            style={{ backgroundColor: "#2E4765" }} onClick={onMakeOrder} id="makeOrder">
                                <div class="col-3">
                                <img src={orderFood} class="img-fluid mx-3"></img>
                                </div>
                                <div class="col-6 mx-3 d-flex justify-content-center align-items-center fw-semibold fs-4 px-3 text-white">
                                <p>Make an Order</p>
                                </div>
                            </div>
                            </a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                <div class="row d-flex justify-content-between">
                <div class="col-md-6 col-lg-4 col-3">
                    <div class="card" style={{ width: "350px", backgroundColor: "#518B6C" }}>
                    <div class="card-body" style={{ margin: "0px" }}>
                        <div class="row">
                        <div class="col-6 mt-0 px-4 text-white">
                            <h5 class="card-title text-white fs-5">Total Orders</h5>
                            <h1 class="display-5 mt-1 mb-1 text-white fw-bold" style={{ fontSize: "40px" }}>{orderCount}</h1>
                            <h5 class="text-white fs-5">{monthName}</h5>
                        </div>

                        <div class="col-5 mx-2">
                            <img src={ordersImage} class="img-fluid mx-3"></img>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4 col-3">
                    <div
                    class="card"
                    style={{ width: "350px", backgroundColor: "#C49C2C" }}
                    >
                    <div class="card-body" style={{ margin: "0px" }}>
                        <div class="row">
                        <div class="col-6 mt-0 px-4 text-white">
                            <h5 class="card-title text-white fs-5">Total Revenue</h5>
                            <h1 class="display-5 mt-1 mb-1 text-white fw-bold" style={{ fontSize: "40px" }}>
                            {revenue}K
                            </h1>
                            <h5 class="text-white fs-5">{monthName}</h5>
                        </div>

                        <div class="col-5 mx-2">
                            <img src={moneyImage} class="img-fluid mx-3"></img>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4 col-3">
                    <div
                    class="card"
                    style={{ width: "350px", backgroundColor: "#D86F33" }}
                    >
                    <div class="card-body" style={{ margin: "0px" }}>
                        <div class="row">
                        <div class="col-6 mt-0 px-4 text-white">
                            <h5 class="card-title text-white fs-5">Total Items</h5>
                            <h1 class="display-5 mt-1 mb-1 text-white fw-bold" style={{ fontSize: "40px" }}>
                            {foodCount}
                            </h1>
                            <h5 class="text-white fs-5">{monthName}</h5>
                        </div>

                        <div class="col-5 mx-2">
                            <img src={foodsImage} class="img-fluid mx-3"></img>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                <div class="row d-flex justify-content-between mt-4">
                <div class="col-md-6 col-lg-7 ">
                    <div class="card">
                    <div class="card-body" style={{ margin: "0px" }}>

                            <Bar
                            datasetIdKey='id'
                            data={{
                                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 'Jul', 'Aug', "Sept", "Oct", "Nov", "Dec"],
                                datasets: [{
                                    label: 'Annual Order Summary',
                                    data: revenueList,
                                    backgroundColor: [
                                        'rgb(255, 99, 132)',
                                        'rgb(75, 192, 192)',
                                        'rgb(255, 205, 86)',
                                        'rgb(201, 203, 207)',
                                        'rgb(54, 162, 235)',
                                        'rgb( 80, 175, 52 )',
                                        'rgb( 153, 97, 217 )',
                                        'rgb(  189, 81, 153 )',
                                        'rgb(  159, 183, 63 )'
                                    ]
                                  }]
                            }}
                            />


                    </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4 mx-4 ">
                    <div class="card">
                    <div class="card-body" style={{ margin: "0px" }}>
                        
                        <div class="row mx-0 d-flex justify-content-between align-items-center mb-4">
                            <div class="col-8">
                                <p class="mb-0 fw-semibold">Food & Beverages</p>
                            </div>
                            <div class="col-auto">
                                <button type="button" class="btn text-white fw-semibold" 
                                style={{ backgroundColor: "#2E4765" }} onClick={onSeeAll}>See All</button>
                            </div>
                        </div>

                        <div class="row mx-0 d-flex justify-content-between align-items-center my-3">
                            <div class="col-3">
                                <img src={dietImage} class="img-fluid" style={{ height: "50px" }}></img>
                            </div>
                            <div class="col-6 d-flex justify-content-start px-0">
                                <p class="mb-0 fw-semibold">Foods</p>
                            </div>
                            <div class="col-auto px-4">
                            <img src={boxImage} class="img-fluid" style={{ height: "30px" }}></img>
                            </div>
                        </div>

                        <div class="row mx-0 d-flex justify-content-between align-items-center my-3">
                            <div class="col-3">
                                <img src={beverageImage} class="img-fluid" style={{ height: "50px" }}></img>
                            </div>
                            <div class="col-6 d-flex justify-content-start px-0">
                                <p class="mb-0 fw-semibold">Beverages</p>
                            </div>
                            <div class="col-auto px-4">
                            <img src={boxImage} class="img-fluid" style={{ height: "30px" }}></img>
                            </div>
                        </div>

                        <div class="row mx-0 d-flex justify-content-between align-items-center my-3">
                            <div class="col-3">
                                <img src={desertImage} class="img-fluid" style={{ height: "50px" }}></img>
                            </div>
                            <div class="col-6 d-flex justify-content-start px-0">
                                <p class="mb-0 fw-semibold">Desserts</p>
                            </div>
                            <div class="col-auto px-4">
                            <img src={boxImage} class="img-fluid" style={{ height: "30px" }}></img>
                            </div>
                        </div>

                        <div class="row mx-0 d-flex justify-content-between align-items-center my-3">
                            <div class="col-3">
                                <img src={fastFoodImage} class="img-fluid" style={{ height: "50px" }}></img>
                            </div>
                            <div class="col-6 d-flex justify-content-start px-0">
                                <p class="mb-0 fw-semibold">Fast Food</p>
                            </div>
                            <div class="col-auto px-4">
                            <img src={boxImage} class="img-fluid" style={{ height: "30px" }}></img>
                            </div>
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
