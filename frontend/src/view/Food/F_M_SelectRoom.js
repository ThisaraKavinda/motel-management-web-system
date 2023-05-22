import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/F_M_Navbar";
import "../../css/modern.css";
// import "../../js/app.js";
// import "./F_M_SelectRoom.css";

import 'reactjs-popup/dist/index.css';

import {getAllRooms} from '../../controllers/room'
import swal from "sweetalert";
import { Sugar } from 'react-preloaders2';

export default function F_M_SelectRoom() {

    let navigate = useNavigate(); 

    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    let appointmentId = "";

    useEffect(() =>{
        getAllRooms().then((res) => {
            // console.log(res)
            setRooms(res);
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

    const onProceed = () =>{ 
        if (appointmentId == "") {
            swal({
                title: "Select a room!",
                text: "Fist select a room to proceed",
                icon: 'info',
                dangerMode: true,
                button: true,
            })
        } else {
            let path  = "/foodSelect/" + appointmentId
            navigate(path);
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

                                    <div class="row mb-2 px-4">
                                        <h5 class="fw-semibold">Select the room</h5>
                                    </div>
                                    
                                    <div class="container d-flex flex-wrap justify-content-start">

                                        {rooms.map((value, index) => (
                                            <div class="col mx-3 mt-1 mb-4" style={{ maxWidth: "250px", minWidth: "250px"}}>
                                                {value.appointment != null ? (
                                                    <button class="btn btn-light w-100 my-2 px-4 py-5 rounded border" id={value.appointment}
                                                    onClick={(e) => appointmentId = e.currentTarget.id}>
                                                        <h5 class="fw-semibold fs-2">Room {value.name}</h5>
                                                    </button>
                                                ) : (
                                                    <button class="btn btn-light w-100 my-2 px-4 py-5 rounded border disabled">
                                                        <h5 class="fw-semibold fs-2">Room {value.name}</h5>
                                                    </button>
                                                )}
                                                
                                            </div>
                                        ))}
                                        
                                    </div>
                                    
                                    <div class="row d-flex justify-content-center mb-3">
                                        <div class="col-3 d-flex justify-content-center">
                                            <button class="btn btn-primary w-75 mx-3 py-2 fw-semibold" onClick={onProceed}>Proceed</button>
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
