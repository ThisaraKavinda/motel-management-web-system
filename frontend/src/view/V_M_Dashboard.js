import React, { useState, useEffect } from 'react';
import Navbar from '../components/V_M_Navbar';
import '../css/modern.css';
import '../js/app.js';

// Controllers

import {getAllVehicleCount ,getAllVehicleAvailableCount,getAllVehicleRepairCount,getAllVehicleDrivingCount} from "../controllers/vehicles"
import{getAllVehicleEmployeesCount} from '../controllers/employee'
export default function V_M_Dashboard() {

	let date_ob = new Date();

    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    
    let sysDate = year + "-" + month + "-" + date;

	const [allVehicleCount , setAllVehicleCount] = useState('');
	const [allVehicleAvailableCount , setAllVehicleAvailableCount] = useState('');
	const [allVehicleDrivingCount , setAllVehicleDrivingCount] = useState('');
	const [allVehicleRepairCount , setAllVehicleRepairCount] = useState('');
	const [allVehicledeptCount , setAllVehicleDptCount] = useState('');

	getAllVehicleCount().then((result)=>{
		setAllVehicleCount(result);
	});
	getAllVehicleAvailableCount().then((result)=>{
		setAllVehicleAvailableCount(result);
	});
	getAllVehicleDrivingCount().then((result)=>{
		setAllVehicleDrivingCount(result);
	});
	getAllVehicleRepairCount().then((result)=>{
		setAllVehicleRepairCount(result);
	});
	getAllVehicleEmployeesCount().then((result)=>{
		setAllVehicleDptCount(result);
	});
    return (

        <div class="wrapper">

<Navbar/>

            <div class="main">

{/* top nav */}

                <main class="content">
                    <div class="container-fluid">

                        <div class="header">
                            <h1 class="header-title">
                                Vehicle Manager Dashboard
                            </h1>

                        </div>

						<div class="row">
							
							<div class="col-md-6 col-lg-3 col-xl">

								<div class="card">
									<div class="card-body">
										<div class="row">
											<div class="col mt-0">
												<center><h5 class="card-title"> Date</h5></center>
											</div>

											<div class="col-auto">
												<div class="avatar">
													<div class="avatar-title rounded-circle bg-primary-dark">
														<i class="align-middle fas fa-fw fa-calendar-alt"></i>
													</div>
												</div>
											</div>
										</div>
										<center><h1 class="display-5 mt-1 mb-3 " >{sysDate}</h1></center>
									</div>
								</div>
							</div>
						</div>


                        <div class="row">
						<div class="col-md-6 col-lg-3 col-xl">
							<div class="card">
								<div class="card-body">
									<div class="row">
										<div class="col mt-0">
											<h5 class="card-title">All Vehicles</h5>
										</div>

										<div class="col-auto">
											<div class="avatar">
												<div class="avatar-title rounded-circle bg-primary-dark">
												<i class="align-middle fas fa fa-car"></i>
												</div>
											</div>
										</div>
									</div>
									<h1 class="display-5 mt-1 mb-3">{allVehicleCount}</h1>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-3 col-xl">
							<div class="card">
								<div class="card-body">
									<div class="row">
										<div class="col mt-0">
											<h5 class="card-title">Available For Trips</h5>
										</div>

										<div class="col-auto">
											<div class="avatar">
												<div class="avatar-title rounded-circle bg-primary-dark">
												<i class="align-middle fas fa fa-taxi"></i>
												</div>
											</div>
										</div>
									</div>
									<h1 class="display-5 mt-1 mb-3">{allVehicleAvailableCount}</h1>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-3 col-xl">
							<div class="card">
								<div class="card-body">
									<div class="row">
										<div class="col mt-0">
											<h5 class="card-title">Vehicles On Trip</h5>
										</div>

										<div class="col-auto">
											<div class="avatar">
												<div class="avatar-title rounded-circle bg-primary-dark">
												<i class="align-middle fas fa fa-taxi"></i>
												</div>
											</div>
										</div>
									</div>
									<h1 class="display-5 mt-1 mb-3">{allVehicleDrivingCount}</h1>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-3 col-xl">
							<div class="card">
								<div class="card-body">
									<div class="row">
										<div class="col mt-0">
											<h5 class="card-title">Vehicles On Repair</h5>
										</div>

										<div class="col-auto">
											<div class="avatar">
												<div class="avatar-title rounded-circle bg-primary-dark">
												<i class="align-middle fas fa fa-taxi"></i>
												</div>
											</div>
										</div>
									</div>
									<h1 class="display-5 mt-1 mb-3">{allVehicleRepairCount}</h1>
								</div>
							</div>
						</div>
						
					</div>

					<div class="row">
							
							<div class="col-md-6 col-lg-3 col-xl">

								<div class="card">
									<div class="card-body">
										<div class="row">
											<div class="col mt">
												<center><h5 class="card-title"> Your Department Employee Count</h5></center>
											</div>

											<div class="col-auto">
												<div class="avatar">
													<div class="avatar-title rounded-circle bg-primary-dark">
														<i class="align-middle fas fa-fw fa fa-users"></i>
													</div>
												</div>
											</div>
										</div>
										<center><h1 class="display-5 mt-1 mb-3 " >{allVehicledeptCount}</h1></center>
									</div>
								</div>
							</div>
						</div>




                </div>
             </main>



            </div>

        </div>


    )

}

