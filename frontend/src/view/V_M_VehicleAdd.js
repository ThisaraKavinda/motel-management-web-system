import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Navbar from '../components/V_M_Navbar';
import swal from 'sweetalert';

//css
import '../css/modern.css';

//js
import '../js/app.js';

//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
// import $ from "jquery";

// Controllers
import { addVehicle } from '../controllers/vehicles';
import { getAllDrivers } from "../controllers/employee";

export default function V_M_VehicleAdd() {
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleIdentification, setvehicleIdentification] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleDriver, setVehicleDriver] = useState("");
  const [driverList, setDriverList] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  

  useEffect(() => {
    getAllDrivers().then((result) => {
        console.log(result);
        var list = result.map((data) => {
            return {  label: data.name };
        })
        setVehicleDriver(list);
    });
}, [])

  function renderList() {
    return vehicleDriver.map((result) => ({
      label: result.name,
      value: result.name,
    }));
  }

  function insertVehicle() {
    if (
      vehicleType === "" &&
      vehicleIdentification === "" &&
      vehicleNumber === "" &&
      driverList === "" &&
      vehicleCapacity === ""
    ) {
      swal("All field are empty..");
    } else if (vehicleType === "") {
      swal("Vehicle Type field are empty");
    } else if (vehicleIdentification === "") {
      swal("Vehicle Identification field are empty");
    } else if (vehicleNumber === "") {
      swal("Vehicle Number field are empty");
    } else if (vehicleDriver === "") {
      swal("Vehicle Driver field are empty");
    } else if (vehicleCapacity === "") {
      swal("Vehicle Capacity field are empty");
    } else if (
      vehicleType === "" ||
      vehicleIdentification === "" ||
      vehicleNumber === "" ||
      driverList === "" ||
      vehicleCapacity === ""
    ) {
      swal("fields are empty");
    } else {
      addVehicle({
        type: vehicleType,
        identification: vehicleIdentification,
        vehicleNumber: vehicleNumber,
        driver: driverList.label,
        vehicleCapacity: vehicleCapacity,
        state: "Available",
      }).then((result) => {
        if (result.status) {
          swal({
            title: "Success!",
            text: "New Vehicle Add Successfully",
            icon: "success",
            timer: 2000,
            button: false,
          });

          setVehicleType("");
          setvehicleIdentification("");
          setVehicleNumber("");
          setVehicleDriver("");
          setVehicleCapacity("");
        } else {
          swal({
            title: "Error!",
            text: "New Vehicle Add Unsuccessfully",
            icon: "error",
            timer: 2000,
            button: false,
          });
        }
      });
    }
  }
  function resetForm() {
    if (
      vehicleType === "" &&
      vehicleIdentification === "" &&
      vehicleNumber === "" &&
      vehicleDriver === "" &&
      vehicleCapacity === ""
    ) {
      swal("fields are already empty");
    }
    setVehicleType("");
    setvehicleIdentification("");
    setVehicleNumber("");
    setVehicleDriver("");
    setVehicleCapacity("");
  }

  return (
    <div class="wrapper">
      <Navbar />
      <div class="main">
        <main class="content">
          <div class="container-fluid">
            <div class="header">
              <h1 class="header-title">Add Vehicle</h1>
            </div>

            <div class="col-md-12">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="inputVehicleType">Vihicle Type</label>
                      <Select
                        options={[
                          { value: "Car", label: "Car" },
                          { value: "Van", label: "Van" },
                          { value: "Bike", label: "Bike" },
                        ]}
                        onChange={(e) => {
                          setVehicleType(e.value);
                        }}
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="inputPIdentification">Identification</label>
                      <input
                        type="text"
                        class="form-control"
                        value={vehicleIdentification}
                        onChange={(e) =>
                          setvehicleIdentification(e.target.value)
                        }
                        name="identification"
                        required
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="inputDriver">Driver</label>
                      <Select  options={vehicleDriver}  onChange={setDriverList} />
                    </div>
                    
                    <div class="mb-3 col-md-6">
                      <label for="inputCapacity">Vehicle Number</label>
                      <input
                        type="text"
                        class="form-control"
                        value={vehicleNumber}
                        onChange={(e) => setVehicleNumber(e.target.value)}
                        name="Capacity"
                        required
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="inputCapacity">Vehicle Capacity</label>
                      <input
                        type="number"
                        class="form-control"
                        value={vehicleCapacity}
                        onChange={(e) => setVehicleCapacity(e.target.value)}
                        name="Capacity"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    class="btn  btn-primary"
                    id="addVehicle"
                    style={{
                      backgroundColor: "#081E3D",
                      borderColor: "#081E3D",
                      color: "#fff",
                    }}
                    onClick={() => insertVehicle()}
                  >
                    Submit
                  </button>
                  <button
                    type="submit"
                    class="btn  btn-primary"
                    id="addVehicle"
                    style={{
                      backgroundColor: "#ffffff",
                      borderColor: "#081E3D",
                      color: "#081E3D",
                      marginLeft: 10,
                      width: 75,
                    }}
                    onClick={() => resetForm()}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

