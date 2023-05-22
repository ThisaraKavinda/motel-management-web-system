import React, { useState, useEffect } from 'react';
import Navbar from "../components/V_M_Navbar";
import { reactBaseURL } from "../config";

//css
import "../css/modern.css";

//jssDADSAD
import "../js/app.js";

//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

// Controllers
import { getAllCompleted, } from '../controllers//vehicleAppointment';

export default function V_M_VehicleAppointmentCompleted() {

  const [vehicleAppointmentList, setVehicleAppointmentList] = useState([]);

  
  useEffect(() => {
    getAllCompleted().then((result) => {

        setVehicleAppointmentList(result);
        
        //initialize datatable
        $(document).ready(function () {
            $('#example').DataTable();
        });
    });

}, [])

function pending() {
  window.location.replace(reactBaseURL + "/vehicle-customer-request");
}

function active() {
  window.location.replace(reactBaseURL + "/vehicle-customer-request-Active");
}

function done() {
  window.location.replace(reactBaseURL + "/vehicle-customer-request-Completed");
}



  return (
    <div class="wrapper">
      <Navbar />
      <div class="main">
        <main class="content">
          <div class="container-fluid">
            <div class="header">
              <h1 class="header-title">Customer Completed Vehicle Trips
              </h1>
            <br></br>
            <br></br>
            <div class="btn-group  mb-3" role="group" aria-label="Large button group">
                                
                                <button onClick={() => pending()} type="button" class="btn btn-secondary">Pending</button>
                                <button onClick={() => active()} type="button" class="btn btn-secondary">OnGoing</button>
                                <button onClick={() => done()} type="button" class="btn btn-secondary">Completed</button>
                            </div>
            </div>
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <table id="example" class="table table-striped my">
                    
                    <thead>
                      <tr>
                        <th>NIC</th>
                        <th>Pickup Place</th>
                        <th>Pickup Date</th>
                        <th>Pickup time</th>
                        <th>End Date</th>
                        <th>End Time</th>
                        <th>Vehicle Info</th>
                        <th>Final Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                   
                      {vehicleAppointmentList.map((value, index)=> {
                        return (
                          <tr key={index} >
                            <td>{value.nic}</td>
                            <td>{value.pickupPlace}</td>
                            <td>{value.pickupDate}</td>
                            <td>{value.pickupTime}</td>
                            <td>{value.endDate}</td>
                            <td>{value.endTime}</td>
                            <td>{value.VehicleSelected}</td>
                            <td>{value.amount}</td>

                          </tr>
                        );
                      })}
                 
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}







