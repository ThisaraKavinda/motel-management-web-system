import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Navbar from "../components/V_M_Navbar";
import swal from "sweetalert";

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
import { getAllVehicles, deleteVehicle } from "../controllers/vehicles";

export default function V_M_ViewVehicles() {
  const [vehicleList, setVehicleSelect] = useState([]);

  useEffect(() => {
    getAllVehicles().then((result) => {
      setVehicleSelect(result);
      //initialize datatable
      $(document).ready(function () {
        $("#example").DataTable();
      });
    });
  }, []);

  function deleteMyVehicle(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteVehicle(id).then((result) => {
          var vehicle = vehicleList.filter((e) => e._id !== result._id);
          setVehicleSelect(vehicle);
        });

        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
          title: "Delete Successfully!",
          buttons: false,
          timer: 2000,
        });
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
              <h1 class="header-title">View Vehicles</h1>
            </div>

            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <table id="example" class="table table-striped my">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Identification</th>
                        <th>Vehicle Number</th>
                        <th>Driver</th>
                        <th>Vehicle Capacity</th>
                        <th>State</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicleList.map((value, index) => {
                        return (
                          <tr key={index}>
                            <td>{value.type}</td>
                            <td>{value.identification}</td>
                            <td>{value.vehicleNumber}</td>
                            <td>{value.driver}</td>
                            <td>{value.vehicleCapacity}</td>
                            <td>{value.state}</td>
                            <td class="table-action">
                              <button
                                class="btn btn-pill btn-danger btn-sm"
                                style={{ marginLeft: 45, width: 60 }}
                                onClick={() => deleteMyVehicle(value._id)}
                              >
                                Delete
                              </button>
                              <Link
                                to={"/vehicleEdit/" + value._id}
                                class="top-bar-link"
                              >
                                <button
                                  class="btn btn-pill btn-success btn-sm"
                                  style={{ marginLeft: 10, width: 60 }}
                                >
                                  Edit
                                </button>
                              </Link>
                            </td>
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







