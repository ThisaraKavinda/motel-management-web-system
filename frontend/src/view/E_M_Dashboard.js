import React, { useState, useEffect } from 'react';
import Navbar from '../components/E_M_Navbar';
import './E_M_Dashboard.css';
import '../js/app.js';

//controllers
import {getAllEmployeesCount,getAllChefCount,getAllKetchenHCount,getAllWaitersCount,getAllReceptionistsCount,getAllOfficeSCount,getAllVehicleEmployeesCount,getAllContractBaseCount} from '../controllers/employee'


export default function E_M_Dashboard() {

	let date_ob = new Date();

    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    
    let sysDate = year + "-" + month + "-" + date;

	const [allEmployeeCount , setAllEmployeeCount] = useState('');
	const [allChefCount , setAllChefCount] = useState('');
	const [allKitchHCount , setAllKitchenHCount] = useState('');
	const [allWaitersCount , setAllWaitersCount] = useState('');
	const [allReceptinistCount , setAllReceptinistCount] = useState('');
	const [allOfficeSCount , setAllOfficeSCount] = useState('');
	const [allDriversCount , setAllDriversCount] = useState('');
	const [allContractBaseCount , setAllContractBaseCount] = useState('');

	getAllEmployeesCount().then((result)=>{
		setAllEmployeeCount(result);
	});
	getAllChefCount().then((result)=>{
		setAllChefCount(result);
	});
	getAllKetchenHCount().then((result)=>{
		setAllKitchenHCount(result);
	});
	getAllWaitersCount().then((result)=>{
		setAllWaitersCount(result);
	});
	getAllReceptionistsCount().then((result)=>{
		setAllReceptinistCount(result);
	});
	getAllOfficeSCount().then((result)=>{
		setAllOfficeSCount(result);
	});
	getAllVehicleEmployeesCount().then((result)=>{
		setAllDriversCount(result);
	});
	getAllContractBaseCount().then((result)=>{
		setAllContractBaseCount(result);
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
                                Employee Manager Dashboard
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
											<h5 class="card-title">All Employee Count</h5>
										</div>

										<div class="col-auto">
											<div class="avatar">
												<div class="avatar-title rounded-circle bg-primary-dark">
												<i class="align-middle fas fa-fw fa fa-users"></i>
												</div>
											</div>
										</div>
									</div>
									<h1 class="display-5 mt-1 mb-3">{allEmployeeCount}</h1>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-3 col-xl">
							<div class="card">
								<div class="card-body">
									<div class="row">
										<div class="col mt-0">
											<h5 class="card-title">Total Chefs</h5>
										</div>

										<div class="col-auto">
											<div class="avatar">
												<div class="avatar-title rounded-circle bg-primary-dark">
												<i class="align-middle fas fa-fw fa fa-users"></i>
												</div>
											</div>
										</div>
									</div>
									<h1 class="display-5 mt-1 mb-3">{allChefCount}</h1>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-3 col-xl">
							<div class="card">
								<div class="card-body">
									<div class="row">
										<div class="col mt-0">
											<h5 class="card-title">Total Kitchen Helpers</h5>
										</div>

										<div class="col-auto">
											<div class="avatar">
												<div class="avatar-title rounded-circle bg-primary-dark">
												<i class="align-middle fas fa-fw fa fa-users"></i>
												</div>
											</div>
										</div>
									</div>
									<h1 class="display-5 mt-1 mb-3">{allKitchHCount}</h1>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-3 col-xl">
							<div class="card">
								<div class="card-body">
									<div class="row">
										<div class="col mt-0">
											<h5 class="card-title">Total Waiters</h5>
										</div>

										<div class="col-auto">
											<div class="avatar">
												<div class="avatar-title rounded-circle bg-primary-dark">
												<i class="align-middle fas fa-fw fa fa-users"></i>
												</div>
											</div>
										</div>
									</div>
									<h1 class="display-5 mt-1 mb-3">{allWaitersCount}</h1>
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
											<h5 class="card-title">Total Receptionists </h5>
										</div>

										<div class="col-auto">
											<div class="avatar">
												<div class="avatar-title rounded-circle bg-primary-dark">
												<i class="align-middle fas fa-fw fa fa-users"></i>
												</div>
											</div>
										</div>
									</div>
									<h1 class="display-5 mt-1 mb-3">{allReceptinistCount}</h1>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-3 col-xl">
							<div class="card">
								<div class="card-body">
									<div class="row">
										<div class="col mt-0">
											<h5 class="card-title">Total Office Staff</h5>
										</div>

										<div class="col-auto">
											<div class="avatar">
												<div class="avatar-title rounded-circle bg-primary-dark">
												<i class="align-middle fas fa-fw fa fa-users"></i>
												</div>
											</div>
										</div>
									</div>
									<h1 class="display-5 mt-1 mb-3">{allOfficeSCount}</h1>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-3 col-xl">
							<div class="card">
								<div class="card-body">
									<div class="row">
										<div class="col mt-0">
											<h5 class="card-title">Total Drivers</h5>
										</div>

										<div class="col-auto">
											<div class="avatar">
												<div class="avatar-title rounded-circle bg-primary-dark">
												<i class="align-middle fas fa-fw fa fa-users"></i>
												</div>
											</div>
										</div>
									</div>
									<h1 class="display-5 mt-1 mb-3">{allDriversCount}</h1>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-3 col-xl">
							<div class="card">
								<div class="card-body">
									<div class="row">
										<div class="col mt-0">
											<h5 class="card-title">Total Contract-based Staff</h5>
										</div>

										<div class="col-auto">
											<div class="avatar">
												<div class="avatar-title rounded-circle bg-primary-dark">
												<i class="align-middle fas fa-fw fa fa-users"></i>
												</div>
											</div>
										</div>
									</div>
									<h1 class="display-5 mt-1 mb-3">{allContractBaseCount}</h1>
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

