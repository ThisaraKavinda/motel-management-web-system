import React, { useState, useEffect } from 'react';
import Navbar from "../components/E_M_Navbar";
import EditEmployeeForm from '../components/EditEmployeeForm';
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

export default function E_M_EmployeeSalaryIncrement() {

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

  const[employee, setEmployee] = useState({});
    
  const [salary, setsalary] = useState(employee.salary)

  const salarySetHandler = (data) => {setsalary(data);}

  function addIncrement(id, e){

    getSelectedEmployee(id).then((data) => {
        
        const employee = data;
        let a = parseInt(salary) + parseInt(employee.salary);
        console.log(a);
        employee.salary = a;
        console.log(a);
        console.log(employee.salary);
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
            salary:employee.salary,

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
                window.location.replace(reactBaseURL + "/manageSalary");
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
            window.location.replace(reactBaseURL + "/manageSalary");
          }, 2050);
        }
      });
      

    })
    
  }

  return (
    <div class="wrapper">
      <Navbar />
      <div class="main">
        <main class="content">
          <div class="container-fluid">
            <div class="header">
              <h1 class="header-title">Manage Salary</h1>
            </div>

            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <table  class="table table-striped my">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>NIC</th>
                        <th>Employee Type</th>
                        <th>Current Salary</th>
                        <th>Increment</th>
                        <th >Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeList.map((value, index) => {
                        return (
                          <tr key={index}>
                            <td>{value.name}</td>
                            <td>{value.nic}</td>
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
                            <td>{value.salary}</td>
                            <EditEmployeeForm value={employee.salary} onSave={salarySetHandler}/>
                            <td class="table-action">
                            
                                <button
                                  class="btn btn-pill btn-success btn-sm"
                                  style={{ marginLeft: 10, width: 60 }}
                                  onClick = {(e) => addIncrement(value._id, e)}
                                >
                                  Add Increment
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







