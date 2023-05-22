import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Navbar from '../components/E_M_Navbar';
import swal from 'sweetalert';

//css
import '../css/modern.css';

//js
import '../js/app.js';

// Controllers
import { addEmployee } from '../controllers/employee';

export default function E_M_Registration() {

    const [employeeName, setEmployeeName] = useState('');
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [employeeGender, setEmployeeGender] = useState('');
    const [employeeDob, setEmployeeDob] = useState('');
    const [employeeAddress, setEmployeeAddress] = useState('');
    const [employeeNIC, setEmployeeNIC] = useState('');
    const [employeePhone, setEmployeePhone] = useState('');
    const [employeePassword, setEmployeePassword] = useState('');
    const [employeeType, setEmployeeType] = useState('');
    const [employeeSalary, setEmployeeSalary] = useState('');

    const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };

    function insertEmployee() {

        if (employeeName === '' && employeeEmail === '' && employeeGender === '' && employeeDob === '' && employeeAddress === '' && employeeNIC === '' && employeePhone === ''&& employeePassword === ''&& employeeType === '' && employeeSalary === '') {
            swal("All field are empty..");
        } else if (employeeName === '') {
            swal("Name field is empty");
        } else if (employeeEmail == "") {
            swal("Email field is empty");
        }else if (!validateEmail(employeeEmail)) {
            swal("Enter a valid email");
        } else if (employeeGender === '') {
            swal("Gender field is empty"); 
        } else if (employeeDob === '') {
            swal("DOB field is empty"); 
        }  else if (employeeAddress === '') {
            swal("Address field is empty");
        } else if (employeeNIC === '') {
            swal("NIC field is empty");
        } else if (employeeNIC.length <10 || isNaN(employeeNIC)){
            swal("Enter a valid NIC");
        } else if (employeePhone === ''){
            swal("Contact No field is empty");
        } else if (employeePhone.length <10 || isNaN(employeePhone)){
            swal("Enter a valid Contact number");
        } else if (employeePassword === '') {
            swal("Password field is empty");
        } else if (employeeType === '') {
            swal("EmployeeType field is empty");
        } else if (employeeSalary === '') {
            swal("EmployeeSalary field is empty");
        } else if (employeeName === '' || employeeEmail === '' || employeeGender === '' || employeeDob === ''  ||  employeeAddress === '' || employeeNIC === '' || employeePhone === '' || employeePassword === '' || employeeType === '' || employeeSalary === '') {
            swal("fields are empty");
        } else {
            addEmployee({ name: employeeName, email: employeeEmail,  gender: employeeGender, dob: employeeDob, address: employeeAddress, nic: employeeNIC, contact: employeePhone, password: employeePassword , Type: employeeType, leaveTaken : 0 , salary: employeeSalary}).then((result) => {
                if (result.status) {

                    swal({
                        title: "Success!",
                        text: "New Employee Add Successfully",
                        icon: 'success',
                        timer: 2000,
                        button: false,
                    });

                    setEmployeeName('');
                    setEmployeeEmail('');
                    setEmployeeGender('');
                    setEmployeeDob('');
                    setEmployeeAddress('');
                    setEmployeeNIC('');
                    setEmployeePhone('');
                    setEmployeePassword('');
                    setEmployeeType('');
                    setEmployeeSalary('');

                    // setTimeout(() => {
                    //     window.location.reload(true);
                    // }, 2050)

                } else {
                    swal({
                        title: "Error!",
                        text: "New Employee Add Unsuccessfully",
                        icon: 'error',
                        timer: 2000,
                        button: false
                    });
                }
            });
        }




    }
    
    function resetForm(){

        if (employeeName === '' && employeeEmail === '' && employeeGender === '' && employeeDob === '' && employeeAddress === '' && employeeNIC === '' && employeePhone === ''&& employeePassword === ''&& employeeType === '' && employeeSalary === '') {
            swal("fields are already empty");
        }
                    setEmployeeName('');
                    setEmployeeEmail('');
                    setEmployeeGender('');
                    setEmployeeDob('');
                    setEmployeeAddress('');
                    setEmployeeNIC('');
                    setEmployeePhone('');
                    setEmployeePassword('');
                    setEmployeeType('');
                    setEmployeeSalary('');

    }


    return (

        <div class="wrapper">
            <Navbar />
            <div class="main">

                <main class="content">
                    <div class="container-fluid">

                        <div class="header">
                            <h1 class="header-title">
                                Registration
                            </h1>

                        </div>


                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-body" >

                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label for="inputEmail4">Name</label>
                                            <input type="text" class="form-control" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} name="name" required />
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="inputPassword4">Email</label>
                                            <input type="email" class="form-control" value={employeeEmail} onChange={(e) => setEmployeeEmail(e.target.value)} name="email" required />
                                        </div>
                                    </div>
                                    <br></br>
                                    <div class="row">
                                    <div class="mb-3 col-md-6">
                                        <label for="inputAddress">Gender</label>
                                        <Select options={
                                            [
                                                { value: 'Male', label: 'Male' },
                                                { value: 'Female', label: 'Female' },
                                            ]
                                        }
                                        onChange={(e) => {
                                            setEmployeeGender(e.value);
                                        }} />


                                    </div>

                                    <br></br>

                                    <div class="mb-3 col-md-6">
                                    
                                        <label for="inputCity">Date of Birth</label>
                                            <input type="date" class="form-control" name="DOB"  value={employeeDob} onChange={(e) => setEmployeeDob(e.target.value)} required />
                                        </div>
                                    
                                    </div>

                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label for="inputAddress">Address</label>
                                            <input type="text" class="form-control"  value={employeeAddress} onChange={(e) => setEmployeeAddress(e.target.value)} name="address" required />

                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="inputAddress">Basic Salary</label>
                                            <input type="text" class="form-control"  value={employeeSalary} onChange={(e) => setEmployeeSalary(e.target.value)} name="salary" required />

                                        </div>
                                    

                                    </div>

                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label for="inputCity">NIC</label>
                                            <input type="text" class="form-control"  value={employeeNIC} onChange={(e) => setEmployeeNIC(e.target.value)}name="nic" required />
                                        </div>
                                        <div class="mb-3 col-md-6">
                                        <label for="inputAddress">Employee Type</label>
                                        <Select options={
                                            [
                                                { value: 'fm', label: 'Food Manager' },
                                                { value: 'em', label: 'Employee Manager' },
                                                { value: 'vm', label: 'Vehicle Manager' },
                                                { value: 'cm', label: 'Customer Manager' },
                                                { value: 'cf', label: 'Chef' },
                                                { value: 'kh', label: 'Kitchen Helper' },
                                                { value: 'wt', label: 'Waiter' },
                                                { value: 'rt', label: 'Receptionist' },
                                                { value: 'os', label: 'Office Staff' },
                                                { value: 'dr', label: 'Driver' },
                                                { value: 'cb', label: 'Contract Base' },

                                            ]
                                            }
                                            onChange={(e) => {
                                                setEmployeeType(e.value);
                                            }} />


                                        </div>
                                        
                                    </div>   
                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label for="inputCity">Password</label>
                                            <input type="text" class="form-control"  value={employeePassword} onChange={(e) => setEmployeePassword(e.target.value)} name="contactNo" required />
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="inputCity">Contact No</label>
                                            <input type="text" class="form-control"  value={employeePhone} onChange={(e) => setEmployeePhone(e.target.value)} name="contactNo" required />
                                        </div>

                                        
                                    </div>
                                    

                                    <button type="submit" class="btn  btn-primary" id="addEmployee" style={{ backgroundColor: '#081E3D', borderColor: '#081E3D', color: '#fff' }} onClick={() => insertEmployee()}>Submit</button>
                                    <button type="submit" class="btn  btn-primary" id="addEmployee" style={{ backgroundColor: '#ffffff', borderColor: '#081E3D', color: '#081E3D', marginLeft: 10, width:75 }} onClick={() => resetForm()}>Reset</button>

                                </div>
                            </div>
                        </div>












                    </div>
                </main>



            </div>

        </div>


    )

}

