import React, { useState, useEffect } from 'react';
import Navbar from '../components/E_M_Navbar';
import '../css/modern.css';
import '../js/app.js';


export default function E_M_UpdateEmployee() {


    return (

        <div class="wrapper">
<Navbar/>
            <div class="main">

                <main class="content">
                    <div class="container-fluid">

                        <div class="header">
                            <h1 class="header-title">
                               Update Employee
                            </h1>

                        </div>

                       
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-body" >
                                
                                            <div class="row">
                                                <div class="mb-3 col-md-6">
                                                    <label for="inputEmail4">Name</label>
                                                    <input type="text" class="form-control"    name="name" required />
                                                </div>
                                                <div class="mb-3 col-md-6">
                                                    <label for="inputPassword4">Email</label>
                                                    <input type="email" class="form-control" id="inputEmail"    name="email" required/>
                                                </div>
                                            </div>

                                            <br></br>

                                            <div class="col-md-12">
                                            <label for="inputAddress">Gender</label>
										<label class="form-check">
											<input class="form-check-input" type="radio" value="option1" name="radios-example" checked=""/>
											<span class="form-check-label">
												Male
											</span>
										</label>
										<label class="form-check">
											<input class="form-check-input" type="radio" value="option2" name="radios-example"/>
											<span class="form-check-label">
												Female
											</span>
										</label>
										
									</div>

                                    <br></br>

                                        
                                            <div class="mb-3 ">
                                                <label for="inputAddress">Address</label>
                                                <input type="text" class="form-control" id="inputAddress"   name="address" required />

                                            </div>

                                            <div class="row">
                                                <div class="mb-3 col-md-6">
                                                    <label for="inputCity">NIC</label>
                                                    <input type="text" class="form-control"   name="nic" required />
                                                </div>
                                                <div class="mb-3 col-md-6">
                                                    <label for="inputCity">Contact No</label>
                                                    <input type="text" class="form-control"   name="contact" required />
                                                </div>                                       

                                            </div>

                                            <button type="submit" class="btn btn-primary">Submit</button>

                                </div>
                            </div>
                        </div>





              



                    


                    </div>
                </main>



            </div>

        </div>


    )

}

