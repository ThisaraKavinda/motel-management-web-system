import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from '../components/E_M_Navbar';
import swal from 'sweetalert';
import Select from 'react-select'
import $ from 'jquery';
import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable'

import logo from '../img/logo/fullLogo.png';

//css
import '../css/modern.css';

//js
import '../js/app.js';

// Controllers
import {getAllEmployeesType} from '../controllers/employee'

export default function C_M_Report() {


    const navigate = useNavigate();

    const [employeeType, setEmployeeType] = useState('');
    const [employeeTypeLabel, setEmployeeTypeLabel] = useState("");

    const [reportList, setReportList] = useState([]);
    const [head, setHead] = useState(false);

    useEffect(() => {
    }, [])

    function appointmentReportGet() {
        if (employeeType === '') {
            swal("Start date not selected");
        } else {
            getAllEmployeesType(employeeType).then((result) => {
                console.log(result);
                setReportList(result);
                setHead(true);
            });
        }
    }


    function downloadPDF() {
      
        const doc = new jsPDF();
        doc.setDrawColor(8, 30, 61);
        doc.setLineWidth(90);    
        doc.line(0, 0, 1000, 0); 
        doc.addImage(logo, 'PNG', 73, 10, 80, 20)
       
    
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'bold')
        doc.text("Selected Employee ", 14, 60)
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'Normal')
        doc.text(":  " + employeeTypeLabel, 45, 60)
        
        doc.autoTable({
            theme: "grid",
            head: [['Name', 'NIC', 'Email','Total Leave Taken','Total Salary']],
            body: reportList.map(col => [[col.name], [col.nic], [col.email] , [col.leaveTaken], [col.salary]]),
            margin: { top: 65 }
        })
         doc.save('appintment.pdf')
    }


    return (

        <div class="wrapper">
            <Navbar />
            <div class="main">

                <main class="content">
                    <div class="container-fluid">

                        <div class="header">
                            <h1 class="header-title">
                                Report
                            </h1>

                        </div>

                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-body" >
                                    <p style={{ fontWeight: 'bold', marginTop: -10 }}>Employee Report</p>
                                    <div class="row  align-items-center" >
                                        <div class="mb-3 col-md-5">
                                            <label for="inputEmail4">Select Employee Type</label>
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
                                                setEmployeeTypeLabel(e.label);
                                            }} />

                                        </div>
                                        <div class="col-md-2 " >
                                            <button type="submit" class="btn  btn-primary " id="addCustomer" style={{ backgroundColor: '#081E3D', borderColor: '#081E3D', color: '#fff', marginLeft: 50 }} onClick={() => appointmentReportGet()} >Search</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div>
                            {head === true ? (
                                <button class="btn  btn-primary" style={{ marginBottom: 25 }} onClick={() => downloadPDF()} >Download PDF</button>
                            ) : (
                                <p></p>
                            )}
                        </div>

                        {head === true ? (
                            <div class="col-12">
                                <div class="card">

                                    <div class="card-body">

                                        <table id="example" class="table table-striped my">

                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Nic</th>
                                                    <th>Email</th>
                                                    <th>Total Leave Taken</th>
                                                    <th>Total Salary</th>
                                                </tr>
                                            </thead>

                                            <tbody>

                                                {reportList.map((value, index) => {
                                                    return <tr key={index}>
                                                        <td>{value.name}</td>
                                                        <td>{value.nic}</td>
                                                        <td>{value.email}</td>
                                                        <td>{value.leaveTaken}</td>
                                                        <td>{value.salary}.00</td>
                                                    </tr>
                                                })}
                                            </tbody>

                                        </table>

                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p></p>
                        )}

                    </div>
                </main>
            </div>
        </div>


    )

}

