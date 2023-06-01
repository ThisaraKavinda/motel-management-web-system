import React, { useState, useEffect } from 'react';
import { useParams,Link } from "react-router-dom";
import Navbar from '../components/E_M_Navbar';

//css
import './E_M_ViewEmployee.css';


//js
import '../js/app.js';

//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

// Controllers
import { getSelectedEmployee } from "../controllers/employee";

export default function E_M_EmployeeSingleView() {
	const { id } = useParams();
	const [employeeData, setEmployeeData] = useState([]);

	useEffect(() => {
		getSelectedEmployee(id).then((result) => {
		  console.log(result);
		  setEmployeeData(result);
		});
	  }, []);



    return (

        <div class="wrapper">
<Navbar/>
            <div class="main">

                <main class="content">
                    <div class="container-fluid">

                        <div class="header">
                            <h1 class="header-title">
                               Single Employee
                            </h1>

                        </div>

                       
                        <div class="col-md-12">
                        <div class="card">
								<div class="card-body">
                                    
									<div class="column" >
									<center><Link
												to={"/manageEmployee/"}
												class="top-bar-link"
											>
												<button
												class="btn btn-pill btn-success btn-sm"
												style={{ marginLeft:-600, width: 60 }}
												>
												Back
												</button>
											</Link></center>
                                        
										<div class="col-sm-3 col-xl-12 col-xxl-12 text-center">
											<img src={require('../img/avatars/avatar.jpg')} class="rounded-circle mt-2" alt="Angelica Ramos" width="120" height="120"/>
										</div>
										<br></br>
                                        <br></br>
									</div>

                                    <div class="row">
                                                <div class="col-md-2"></div>
                                                <div class="col-md-8"><table class="table table-sm my-2 " >
										<tbody>
											<tr>
												<th>Name</th>
												<td>{employeeData.name}</td>
											</tr>
											<tr>
												<th>Email</th>
												<td>{employeeData.email}</td>
											</tr>
											<tr>
												<th>Address</th>
												<td>{employeeData.address}</td>
											</tr>
											<tr>
												<th>NIC</th>
												<td>{employeeData.nic}</td>
											</tr>
											<tr>
												<th>Date of Birth</th>
												<td>{employeeData.dob}</td>
											</tr>
											<tr>
												<th>employee Total Salary</th>
												<td>{employeeData.salary}</td>
											</tr>
											<tr>
												<th>Contact Number</th>
												<td>{employeeData.contact}</td>
											</tr>
											
											
										</tbody>
									</table></div>
                                                <div class="col-md-2"></div>
                                            </div>


                                            <hr></hr>
                                            
									
								</div>
							</div>
                        </div>





              



                    


                    </div>
                </main>



            </div>

        </div>


    )

}

