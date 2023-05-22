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

import correctImg from '../../img/icons/fmchecked.png';
import foodImg from '../../img/photos/food-1.jpg';

import {getRecordsForAOrderWithImage} from '../../controllers/foodCart'
import {getSelectedCustomerByNic} from '../../controllers/customer'

export default function F_M_OrderPlaced() {

    let navigate = useNavigate(); 

    const {id} = useParams();
    
    const [itemList, setItemList] = useState([]);
    const [nic, setNic] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const [name, setName] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRecordsForAOrderWithImage(id).then((result) => {
            // console.log(result);
            setItemList(result);
            setNic(result[0].nic);
            setDate(result[0].date);
            setTime(result[0].time);
            let amount = 0;
            for (let item of result) {
                amount += Number(item.price)
            }
            setTotalAmount(amount);
            getSelectedCustomerByNic(result[0].nic).then((result) => {
                // console.log(result);
                setName(result.name);
            })
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

    const onDashboard = () => {
        navigate("/foodDashboard");
    }


    return (
        <React.Fragment>
        <div class="wrapper">
        <Navbar />
        <div class="main">
            <main class="content">
                <div class="container-fluid">         
                    <div class="header">
                        <h1 class="header-title">Order Confirmation</h1>
                    </div>
                    <div class="col-md-12 mb-4">
                        <div class="card">
                            <div class="card-body mt-3 mb-2 " style={{ margin: "0px" }}>

                                <div class="row d-flex justify-content-center mt-3 mb-1 align-items-center">
                                    <div class="col-1">
                                        <img src={correctImg} class="img-fluid"></img>
                                    </div>  
                                    <div class="col-3">
                                        <h2 class="fw-bold fs-1">Order placed</h2>
                                    </div>                                   
                                </div>
                            </div>  
                        </div>
                    </div>  

                    <div class="col-md-12 mb-3">
                        <div class="card">
                            <div class="card-body " style={{ margin: "0px" }}>
                                <div class="card-body " style={{ margin: "0px" }}>
                                    <div class="row d-flex justify-content-start align-items-center px-6">
                                        <div class="col-8 justify-content-center">
                                            <p class="fs-5 fw-semibold" style={{marginBottom: 0}}>Order Id : #{id}</p>
                                        </div>
                                        <div class="col-4 justify-content-center">
                                            <p class="fs-5 fw-semibold" style={{marginBottom: 0}}>Total amount : Rs. {totalAmount}.00</p>
                                        </div>                                    
                                    </div>
                                    <div class="row d-flex justify-content-start align-items-center px-6 mt-1">
                                        <div class="col-8 justify-content-center">
                                            <p class="fs-5 fw-semibold" style={{marginBottom: 0}}>Name : {name}</p>
                                        </div>    
                                        <div class="col-4 justify-content-center">
                                            <p class="fs-5 fw-semibold" style={{marginBottom: 0}}>NIC : {nic}</p>
                                        </div>                              
                                    </div>
                                    <div class="row d-flex justify-content-start align-items-center px-6 mt-1">
                                        <div class="col-8 justify-content-center">
                                            <p class="fs-5 fw-semibold" style={{marginBottom: 0}}>Date : {date}</p>
                                        </div>    
                                        <div class="col-4 justify-content-center">
                                            <p class="fs-5 fw-semibold" style={{marginBottom: 0}}>Time : {time}</p>
                                        </div>                              
                                    </div>
                                    
                                    <div class="d-flex justify-content-center">
                                        <table id="example" class="table my mx-6 mt-5 mb-1 w-100">

                                            <tbody class="" style={{border: "none"}}>

                                                {itemList.map((value, index) => {
                                                    return(
                                                        <tr class="mt-2" style={{border: "none"}}>
                                                            <td class="text-center" style={{width: "120px", border: "none"}}>
                                                                <img src={value.image} class="img-thumbnail"></img>
                                                            </td>
                                                            <td class="text-center fs-5" style={{border: "none"}}>{value.itemId}</td>
                                                            <td class="text-start fs-5" style={{border: "none"}}>{value.itemName}</td>
                                                            <td class="text-start fs-5" style={{border: "none"}}>Rs. {value.price}</td>
                                                        </tr>
                                                    )
                                                })}

                                            </tbody>
                                        </table>
                                    </div>  
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="row d-flex justify-content-center align-items-center px-6 mt-3">
                        <div class="col-4 d-flex justify-content-center mt-3">
                            <button class="btn  btn-primary px-5 py-2 fs-5 fw-semibold" 
                            style={{ marginBottom: 25 }} onClick={onDashboard}>Go to Dashboard</button>
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
