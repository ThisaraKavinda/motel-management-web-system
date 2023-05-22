import React, { useState, useEffect } from "react";
import Navbar from "../components/E_M_Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { reactBaseURL } from "../config";
import swal from "sweetalert";
import Select from "react-select";

//components
import FormInput from "../components/FormInput";
import FormInputDate from '../components/FormInputDate';

//css
import "../css/modern.css";

//js
import "../js/app.js";

// Controllers
import { getSelectedEmployee, editEmployee } from "../controllers/employee";

export default function E_M_EmployeeEdit(props) {
  const { id } = useParams();

  const genderChange = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
];

  const TypeChange = [
  { value: "fm", label: "Food Manager" },
  { value: "em", label: "Employee Manager" },
  { value: "vm", label: "Vehicle Manager" },
  { value: "cm", label: "Customer Manager" },
  { value: 'cf', label: 'Chef' },
  { value: 'kh', label: 'Kitchen Helper' },
  { value: 'wt', label: 'Waiter' },
  { value: 'rt', label: 'Receptionist' },
  { value: 'os', label: 'Office Staff' },
  { value: 'dr', label: 'Driver' },
  { value: 'cb', label: 'Contract Base' },

];


  const [employeeData, setEmployeeData] = useState([]);
  const [employeGender, setEmployeGender] = useState({});
  const [employeeType, setEmployeeType] = useState({});
  

  useEffect(() => {
    getSelectedEmployee(id).then((result) => {
      console.log(result);
      setEmployeeData(result);
      setEmployeGender({ label: result.gender, value: result.gender });
      setEmployeeType({ label: result.Type, value: result.Type });
    });
  }, []);

  const [employeeName, setEmployeeName] = useState(employeeData.name);
  const [employeeEmail, setEmployeeEmail] = useState(employeeData.email);
  const [employeeDob, setEmployeeDob] = useState(employeeData.dob);
  const [employeeAddress, setEmployeeAddress] = useState(employeeData.address);
  const [employeeNic, setEmployeeNic] = useState(employeeData.nic);
  const [employeePassword, setEmployeePassword] = useState(employeeData.password);
  const [employeeContact, setEmployeecontact] = useState(employeeData.contact);


  const nameSetHandler = (data) => {setEmployeeName(data);};
  const emailSetHandler = (data) => {setEmployeeEmail(data);};
  const genderSetHandler = (data) => {setEmployeGender(data); };
  const dobSetHandler = (data) => {setEmployeeDob(data); };
  const addressSetHandler = (data) => {setEmployeeAddress(data);};
  const nicSetHandler = (data) => {setEmployeeNic(data);};
  const typeSetHandler = (data) => {setEmployeeType(data);};
  const passwordSetHandler = (data) => {setEmployeePassword(data);};
  const contactSetHandler = (data) => {setEmployeecontact(data);};

  function editMyEmployee(id) {
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
          name: employeeName,
          email: employeeEmail,
          gender: employeGender.label,
          dob: employeeDob,
          address: employeeAddress,
          nic: employeeNic,
          Type:employeeType.value,
          password: employeePassword,
          contact: employeeContact,
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
              window.location.replace(reactBaseURL + "/manageEmployee");
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
          window.location.replace(reactBaseURL + "/manageEmployee");
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
              <h1 class="header-title">Edit Employee</h1>
            </div>

            <div class="col-md-12">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="inputEmail4">Name</label>
                      <FormInput
                        value={employeeData.name}
                        title="number"
                        onSave={nameSetHandler}
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="inputEmail4">Email</label>
                      <FormInput
                        value={employeeData.email}
                        title="number"
                        onSave={emailSetHandler}
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="mb-3 col-md-6">
                        <label for="inputEmail4">Gender</label>
                        <Select
                            options={genderChange}
                            hideSelectedOptions={false}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            value={employeGender}
                            onChange={(e) => setEmployeGender(e)}
                        />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="inputEmail4">Date of Birth</label>
                      <FormInputDate
                        value={employeeData.dob}
                        title="number"
                        onSave={dobSetHandler}
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="mb-3">
                    <label for="inputEmail4">Address</label>
                      <FormInput
                        value={employeeData.address}
                        title="number"
                        onSave={addressSetHandler}
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="inputEmail4">NIC</label>
                      <FormInput
                        value={employeeData.nic}
                        title="number"
                        onSave={nicSetHandler}
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="inputEmail4">Employee Type</label>
                        <Select
                            options={TypeChange}
                            hideSelectedOptions={false}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            value={employeeType}
                            onChange={(e) => setEmployeeType(e)}
                        />
                    </div>
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="inputEmail4">Password</label>
                      <FormInput
                        value={employeeData.password}
                        title="number"
                        onSave={passwordSetHandler}
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="inputEmail4">Contact No</label>
                      <FormInput
                        value={employeeData.contact}
                        title="number"
                        onSave={contactSetHandler}
                      />
                    </div>
                  </div>


                  <button
                    type="submit"
                    onClick={() => editMyEmployee(id)}
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
