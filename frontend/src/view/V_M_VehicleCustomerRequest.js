import React, { useState, useEffect } from 'react';
import Navbar from "../components/V_M_Navbar";
import swal from "sweetalert";
import { reactBaseURL } from "../config";
import Select from 'react-select'

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
import { getAllavalable ,editVehicleState  } from "../controllers/vehicles";
import { getAllPending, editVehicleAppointmentState } from '../controllers/vehicleBooking';
import { confirmVehicleBooking } from '../controllers/vehicleAppointment';


export default function V_M_VehicleAppointmentView() {

  const [vehicleBookingList, setVehicleBookingList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const [vehicleId, setVehicleId] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  

  useEffect(() => {
    getAllPending().then((result) => {
        setVehicleBookingList(result);

        //initialize datatable
        $(document).ready(function () {
            $('#example').DataTable();
        });
    });

}, [])

  useEffect(() => {
    getAllavalable().then((result) => {
        var list = result.map((data) => {
            return { value: data._id, label: data.identification  };
        })

        setVehicleList(list);
    });

  }, [])

  const addVehicleAppoinment = async (id, nic, place, date, time, vehicleBookingId,vId) => {
    if (vehicleId == "" || vehicleName =="") {
      swal("Please select a vehicle first");
      return;
    }
    const newItem  = {
      appointmentID: id,
      vehicleID: vehicleId,
      nic: nic,
      pickupPlace: place,
      pickupDate: date,
      pickupTime: time,
      endDate: null,
      endTime: null,
      VehicleSelected: vehicleName,
      amount: null,
      status: "driving"
    }
    console.log(newItem)
    await confirmVehicleBooking(newItem).then((res) => {
      editVehicleAppointmentState(vehicleBookingId).then((res) => {
        editVehicleState(vehicleId).then((res) => {
          swal({
            title: "Success!",
            text: "Trip Started Successfully",
            icon: "success",
            timer: 6000,
            button: false,
          });
          window.location.replace(reactBaseURL + "/vehicle-customer-request");
        })
      })
    })

    .catch((err) => {
      console.log(err)
    })

  }
  function removeVehicleAppoinment(id) {
    

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

async function onChangeVehicle(e) {
  console.log(e)
  await setVehicleId(e.value);
  await setVehicleName(e.label);
}



  return (
    <div class="wrapper">
      <Navbar />
      <div class="main">
        <main class="content">
          <div class="container-fluid">
            <div class="header">
              <h1 class="header-title">Customer Pending Vehicle Request
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
                        <th>Requested Vehicle Type</th>
                        <th>Available Vehicle</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                   
                      {vehicleBookingList.map((value, index)=> {
                        return (
                          <tr key={index} >
                            
                            <td>{value.nic}</td>
                            <td>{value.places}</td>
                            <td>{value.date}</td>
                            <td>{value.time}</td>
                            <td>{value.type}</td>

                            {value.state === "pending" ? (
                                <td > <Select  options={vehicleList} onChange={(e) => onChangeVehicle(e)} /></td>
                              ) : (
                                  <td >{value.vehicle}</td>
                              )}

                            <td class="table-action" ><button class="btn btn-pill btn-success btn-sm"
                            onClick={() => addVehicleAppoinment(value.appointmentID, value.nic, value.places, value.date, value.time, value._id)}>Confirm</button>
                            <button class="btn btn-pill btn-danger btn-sm" onClick={() => removeVehicleAppoinment(value._id)}>Decline</button></td>
                          
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







