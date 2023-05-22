import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Navbar from "../components/E_M_Navbar";
import swal from "sweetalert";
import { reactBaseURL } from "../config";

//css
import "../css/modern.css";

//js
import "../js/app.js";

//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

// Controllers
import { getAllEmployees, getSelectedEmployee ,editEmployee} from "../controllers/employee";

export default function E_M_CustomerAdd() {

  let totalLeave = 21;

  const [employeeList, setEmployeeSelect] = useState([]);

  useEffect(() => {
    getAllEmployees().then((result) => {
      setEmployeeSelect(result);
      //initialize datatable
      $(document).ready(function () {
        $("#example").DataTable();
      });
    });
  }, []);

  function addLeave(id, e) {

    getSelectedEmployee(id).then((data) => {
      const employee = data;
      console.log(employee);

     

      if(employee.leaveTaken<=20){
        employee.leaveTaken += 1;
      swal({
        title: "Are you sure?",
        text: "Do you want to change Employee details!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          editEmployee({
            _id: id,
            leaveTaken:employee.leaveTaken,

          }).then((result) => {
            if (result) {
              swal({
                title: "Success!",
                text: "Employee Update Successfully",
                icon: "success",
                timer: 2000,
                button: false,
              });
  
              setTimeout(() => {
                window.location.replace(reactBaseURL + "/manageLeaves");
              }, 2050);
            } else {
              swal({
                title: "Error!",
                text: "Employee Update Unsuccessfully",
                icon: "error",
                timer: 2000,
                button: false,
              });
            }
          });
  
          swal({
            title: "Success!",
            text: "Employee Update Successfully",
            icon: "success",
            timer: 2000,
            button: false,
          });
  
          setTimeout(() => {
            window.location.replace(reactBaseURL + "/manageLeaves");
          }, 2050);
        }
      });
    }else{
      swal({
        title: "Error!",
        text: "Leave Limit is Exceeded",
        icon: "error",
        timer: 2000,
        button: false,
      });
    }

    })
    
  }

  return (
    <div class="wrapper">
      <Navbar />
      <div class="main">
        <main class="content">
          <div class="container-fluid">
            <div class="header">
              <h1 class="header-title">Manage Leaves</h1>
            </div>

            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <table id="example" class="table table-striped my">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Total Leaves</th>
                        <th>Leave Remainng</th>
                        <th>Leave Taken</th>
                        <th >Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeList.map((value, index) => {
                        return (
                          <tr key={index}>
                            <td>{value.name}</td>
                            <td>{value.email}</td>
                            <td>{totalLeave}</td>
                            <td>{totalLeave - value.leaveTaken}</td>
                            <td>{value.leaveTaken}</td>
                            <td class="table-action">
                            
                                <button
                                  class="btn btn-pill btn-success btn-sm"
                                  style={{ marginLeft: 10, width: 60 }}
                                  onClick = {(e) => addLeave(value._id, e)}
                                >
                                  Add Leave
                                </button>
                           
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







