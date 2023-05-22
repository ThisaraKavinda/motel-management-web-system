import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

//css
import '../css/modern.css';

//js
import '../js/app.js';

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';


// Controllers
import { getVehicleAppointmentBill } from '../controllers/vehicleAppointment';
import { getSelectedAppointment } from '../controllers/appointment';
import { getRoomBill } from '../controllers/room';
import { getFoodBill } from '../controllers/foodCart';


export default function CustomerBill() {

    const location = useLocation();
	const id = location.state.id;

	let roomTotal = 0;
	let vehicleTotal = 0;
	let foodTotal = 0;


	const [vehicleBillList, setVehicleBillList] = useState([]);
	const [roomBillList, setRoomBillList] = useState([]);
	const [foodBillList, setFoodBillList] = useState([]);
	const [appointment, setAppointment] = useState([]);

    useEffect(() => {
        getVehicleAppointmentBill({id:id}).then((result) => {
            setVehicleBillList(result);
        });
    }, [])
	useEffect(() => {
        getRoomBill({id:id}).then((result) => {
            setRoomBillList(result);
        });
    }, [])
	useEffect(() => {
        getFoodBill({id:id}).then((result) => {
            setFoodBillList(result);
        });
    }, [])
	useEffect(() => {
        getSelectedAppointment(id).then((result) => {
            setAppointment(result);
			console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
			console.log(result);
			console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
        });
    }, [])

    return (

        <div class="wrapper">
            <div class="main">
                <main class="content">
                    <div class="container-fluid d-flex justify-content-center">
                        <div class="col-8 ">
                        <div class="card ">
								<div class="card-body m-sm-3 m-md-5">
									<table class="table table-sm">
										<thead>
											<tr>
												<th>Description</th>
												<th>Date</th>
												<th class="text-end">Amount</th>
											</tr>
										</thead>
										<tbody>
										{vehicleBillList.map((value, index) => {
                                                return <tr key={index}>
												<td>{"Traval to"+" "+value.pickupPlace}</td>
												<td>{value.pickupDate}</td>
												<td class="text-end">{value.amount+".00"}</td>
												<td class="d-xxl-none">{vehicleTotal=vehicleTotal+Number(value.amount)}</td>
											</tr>
											 })}
											 {roomBillList.map((value, index) => {
                                                return <tr key={index}>
												<td>{"Traval to"+" "+value.name}</td>
												<td>{appointment.appointmentDate}</td>
												<td class="text-end">{value.price+".00"}</td>
												<td class="d-xxl-none">{roomTotal=roomTotal+Number(value.price)}</td>
											</tr>
											 })}
											 {foodBillList.map((value, index) => {
                                                return <tr key={index}>
												<td>{value.itemName}</td>
												<td>{value.date}</td>
												<td class="text-end">{value.price}</td>
												<td class="d-xxl-none">{foodTotal=foodTotal+Number(value.price)}</td>
											</tr>
											 })}
											
											<tr>
                                            <th>Total </th>
												<th>&nbsp;</th>
												<th class="text-end">{vehicleTotal+roomTotal+foodTotal+".00"}</th>
											</tr>
										</tbody>
									</table>

								</div>
							</div>
                        </div>


                    </div>
                </main>
            </div>
        </div>


    )
}

