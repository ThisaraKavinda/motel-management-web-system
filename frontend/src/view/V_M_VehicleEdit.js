import React, { useState, useEffect } from "react";
import Navbar from "../components/V_M_Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { reactBaseURL } from "../config";
import swal from "sweetalert";
import Select from "react-select";

//components
import FormInput from "../components/FormInput";

//css
import "../css/modern.css";

//js
import "../js/app.js";

// Controllers
import { getSelectedVehicle, editVehicle } from "../controllers/vehicles";
import { getAllDrivers } from "../controllers/employee";

export default function V_M_VehicleEdit(props) {
  const { id } = useParams();

  const vehicleTypeOptions = [
    { value: "Van", label: "Van" },
    { value: "Car", label: "Car" },
    { value: "Bike", label: "Bike" },
  ];

  const vehicleStateOptions = [
    { value: "Avalable", label: "Available" },
    { value: "driving", label: "Driving" },
    { value: "In Repair", label: "In Repair" },
  ];


  const [vehicleData, setVehicleData] = useState([]);
  const [vehicleType, setSelectedVehicleType] = useState({});
  const [selectedState, setSelectedState] = useState({});
  const [selectedDriver, setSelectedDriver] = useState({});
  const [driverList, setDriverList] = useState([]);


  useEffect(() => {
    getSelectedVehicle(id).then((result) => {
      setVehicleData(result);
      setSelectedVehicleType({ label: result.type, value: result.type });
      setSelectedState({ label: result.state, value: result.state });
      setSelectedDriver({ label: result.driver, value: result.driver });
    });
  }, []);

  useEffect(() => {
    getAllDrivers().then((result) => {
        var list = result.map((data) => {
            return { value: data._id, label: data.name };
        })
        setDriverList(list);
    });

}, [])

//   useEffect(() => {
//     getAllEmployees().then((result) => {
//         console.log(result);
//         var list = result.map((data) => {
//             return {  label: data.name };
//         })
//         setVehicleDriver(list);
//     });
// }, [])



  const [vehicleIdentidication, setVehicleIdentification] = useState( vehicleData.identification );
  const [vehicleNumber, setVehicleNumber] = useState(vehicleData.vehicleNumber);
  const [vehicleCapacity, setVehicleCapacity] = useState( vehicleData.vehicleCapacity);


  const IdentificationSetHandler = (data) => {
    setVehicleIdentification(data);
  };
  const numberSetHandler = (data) => {
    setVehicleNumber(data);
  };
  const capacitySetHandler = (data) => {
    setVehicleCapacity(data);
  };

  function editMyVehicle(id) {
    swal({
      title: "Are you sure?",
      text: "Do you want to change Vehicle details!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        
        editVehicle({
          _id: id,
          type: vehicleType.label,
          identification: vehicleIdentidication,
          vehicleNumber: vehicleNumber,
          driver: selectedDriver.label,
          vehicleCapacity: vehicleCapacity,
          state:selectedState.label
        }).then((result) => {
          if (result) {
            swal({
              title: "Success!",
              text: "Vehicle Update Successfully",
              icon: "success",
              timer: 2000,
              button: false,
            });

            setTimeout(() => {
              window.location.replace(reactBaseURL + "/vihicleList");
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
          window.location.replace(reactBaseURL + "/vihicleList");
        }, 2050);
      }
    });
  }

  return (
    <div class="wrapper">
      <Navbar />
      <div class="main">
        <main class="content">
          <div class="container-fluid">
            <div class="header">
              <h1 class="header-title">Edit Vehicle</h1>
            </div>

            <div class="col-md-12">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="inputEmail4">Type</label>
                      <Select
                        options={vehicleTypeOptions}
                        hideSelectedOptions={false}
                        getOptionLabel={(option) => option.label}
                        getOptionValue={(option) => option.value}
                        value={vehicleType}
                        onChange={(e) => setSelectedVehicleType(e)}
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="inputPassword4">Identification</label>
                      <FormInput
                        value={vehicleData.identification}
                        title="number"
                        onSave={IdentificationSetHandler}
                      />
                    </div>
                  </div>

                  <div class="mb-3 ">
                    <label for="inputAddress">Vehicle Number</label>
                    <FormInput
                      value={vehicleData.vehicleNumber}
                      title="number"
                      onSave={numberSetHandler}
                    />
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="inputCity">Driver Name</label>
                      <Select
                        options={driverList}
                        hideSelectedOptions={false}
                        getOptionLabel={(option) => option.label}
                        getOptionValue={(option) => option.value}
                        value={selectedDriver}
                        onChange={(e) => setSelectedDriver(e)}
                      />
                    </div>

                    <div class="mb-3 col-md-6">
                      <label for="inputCity">Vehicle Capacity</label>
                      <FormInput
                        value={vehicleData.vehicleCapacity}
                        title="number"
                        onSave={capacitySetHandler}
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="inputCity">State</label>
                      <Select
                        options={vehicleStateOptions}
                        hideSelectedOptions={false}
                        getOptionLabel={(option) => option.label}
                        getOptionValue={(option) => option.value}
                        value={selectedState}
                        onChange={(e) => setSelectedState(e)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    onClick={() => editMyVehicle(id)}
                    class="btn  btn-primary"
                    id="addCustomer"
                    style={{
                      backgroundColor: "#081E3D",
                      borderColor: "#081E3D",
                      color: "#fff",
                    }}
                  >
                    Submit
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
