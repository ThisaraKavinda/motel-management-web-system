import React, { useState, useEffect } from 'react';
import Navbar from "../components/V_M_Navbar";
import FormInputNumber from "../components/FormInputNumber"
import FormInputDate from "../components/FormInputDate"
import FormInputTime from "../components/FormInputTime"
import swal from "sweetalert";
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
import { getAllDriving, editVehicleBooking } from '../controllers//vehicleAppointment';
import { editVehicleState2  } from "../controllers/vehicles";

export default function V_M_VehicleAppointmentView() {

  const [vehicleAppointmentList, setVehicleAppointmentList] = useState([]);

  const[vehicleApp, setvehicleApp] = useState({});

  const [amount, setAmount] = useState(vehicleApp.amount)
  const appointmentAmountHandler = (data) => {setAmount(data);}
  const [endDate, setEndDate] = useState(vehicleApp.endDate)
  const appointmentEndDateHandler = (data) => {setEndDate(data);}
  const [endTime, setEndTime] = useState(vehicleApp.endTime)
  const appointmentEndTimeHandler = (data) => {setEndTime(data);}

  
  console.log(amount);
  console.log(endDate);
  console.log(endTime);

  useEffect(() => {
    getAllDriving().then((result) => {

      const vehicleApp = result;
      setVehicleAppointmentList(result);
      

        //initialize datatable
        $(document).ready(function () {
            $('#example').DataTable();
        });
    });

}, [])

function UpdateVehicleAppointment(id, vehicleId) {

  swal({
    title: "Are you sure?",
    text: "Is Trip is Finished?!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willUpdate) => {
    if (willUpdate) {
      
      editVehicleBooking({
        _id: id,
        endDate: endDate,
        endTime: endTime,
        amount: amount,
        status:"Completed"
      })
      console.log(vehicleId)
      editVehicleState2(vehicleId)
      .then((result) => {
        if (result) {
          swal({
            title: "Success!",
            text: "Vehicle Update Successfully",
            icon: "success",
            timer: 2000,
            button: false,
          });

          setTimeout(() => {
            window.location.replace(reactBaseURL + "/vehicle-customer-request-Active");
          }, 2050);
        } else {
          swal({
            title: "Error!",
            text: "Vehicle Update Unsuccessfully",
            icon: "error",
            timer: 2000,
            button: false,
          });
        }
      });

      swal({
        title: "Success!",
        text: "Vehicle Update Successfully",
        icon: "success",
        timer: 2000,
        button: false,
      });

      setTimeout(() => {
        window.location.replace(reactBaseURL + "/vehicle-customer-request-Active");
      }, 2050) ;
    }
  });
}


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
              <h1 class="header-title">Customer OnGoing Vehicle Trips
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
                        <th>Pickup</th>
                        <th>Pickup Date</th>
                        <th>Pickup time</th>
                        <th>End Date & Time</th>
                        <th>Vehicle </th>
                        <th>Amount </th>
                        <th>Action </th>

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
                            <FormInputDate value={vehicleApp.endDate} onSave={appointmentEndDateHandler}></FormInputDate>
                            <br></br>
                            <FormInputTime value={vehicleApp.endTime} onSave={appointmentEndTimeHandler}></FormInputTime>
                            <td>{value.VehicleSelected}</td>
                            <br></br>
                            <FormInputNumber value={vehicleApp.amount} onSave={appointmentAmountHandler}></FormInputNumber>
                            <br></br>
                            <td class="table-action" ><button class="btn btn-pill btn-success btn-sm"
                           onClick = {(e) => UpdateVehicleAppointment(value._id, value.vehicleID, e)}>Confirm</button></td>
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







