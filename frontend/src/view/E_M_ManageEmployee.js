import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Navbar from "../components/E_M_Navbar";
import swal from "sweetalert";

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
import { getAllEmployees, deleteEmployee } from "../controllers/employee";

export default function E_M_CustomerAdd() {
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

  function deleteMyEmployee(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteEmployee(id).then((result) => {
          var employee = employeeList.filter((e) => e._id !== result._id);
          setEmployeeSelect(employee);
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
              <h1 class="header-title">Manage Employee</h1>
            </div>

            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <table id="example" class="table table-striped my">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Contact No</th>
                        <th>Employee Type</th>
                        <th >Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeList.map((value, index) => {
                        return (
                          <tr key={index}>
                            <td>{value.name}</td>
                            <td>{value.email}</td>
                            <td>{value.gender}</td>
                            <td>{value.address}</td>
                            <td>{value.contact}</td>
                            {value.Type === "cm" ? <>
                                <td >Customer Manager</td>
                            </>
                                :
                                ''
                            }{value.Type === "vm" ? <>
                            <td >Vehicle Manager</td>
                            </>
                                :
                                ''
                            }
                            {value.Type === "fm" ? <>
                            <td >Food Manager</td>
                            </>
                                :
                                ''
                            }
                            {value.Type === "em" ? <>
                            <td >Employee Manager</td>
                            </>
                                :
                                ''
                            }
                            {value.Type === "cf" ? <>
                            <td >Chef</td>
                            </>
                                :
                                ''
                            }
                            {value.Type === "kh" ? <>
                            <td >Kitchen Helper</td>
                            </>
                                :
                                ''
                            }
                            {value.Type === "wt" ? <>
                            <td >Waiter</td>
                            </>
                                :
                                ''
                            }
                            {value.Type === "rt" ? <>
                            <td >Receptionist</td>
                            </>
                                :
                                ''
                            }
                            {value.Type === "os" ? <>
                            <td >Office Staff</td>
                            </>
                                :
                                ''
                            }
                            {value.Type === "dr" ? <>
                            <td >Driver</td>
                            </>
                                :
                                ''
                            }
                            {value.Type === "cb" ? <>
                            <td >Contract Base</td>
                            </>
                                :
                                ''
                            }
                            <td class="table-action">
                              <button
                                class="btn btn-pill btn-danger btn-sm"
                                style={{ marginLeft: 45, width: 60 }}
                                onClick={() => deleteMyEmployee(value._id)}
                              >
                                Delete
                              </button>
                              <Link
                                to={"/employeeEdit/" + value._id}
                                class="top-bar-link"
                              >
                                <button
                                  class="btn btn-pill btn-success btn-sm"
                                  style={{ marginLeft: 10, width: 60 }}
                                >
                                  Edit
                                </button>
                              </Link>
                              <Link
                                to={"/employeeView/" + value._id}
                                class="top-bar-link"
                              >
                                <button
                                  class="btn btn-pill btn-success btn-sm"
                                  style={{ marginLeft: 10, width: 60 }}
                                >
                                  View
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







