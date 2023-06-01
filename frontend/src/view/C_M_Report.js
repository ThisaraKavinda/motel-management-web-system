import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from '../components/C_M_Navbar';
import swal from 'sweetalert';
import Select from 'react-select'
import $ from 'jquery';
import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable'

import logo from '../img/logo/fullLogo.png';

//css
import "./C_M_Report.css";

//js
import '../js/app.js';

// Controllers
import { getAllActive, appointmentReport } from '../controllers/appointment';

export default function C_M_Report() {

    let appointmentCount = 0;
    let guestCount = 0;

    $("input").on("change", function () {
        this.setAttribute(
            "data-date",
            moment(this.value, "YYYY-MM-DD")
                .format(this.getAttribute("data-date-format"))
        )
    }).trigger("change")

    const navigate = useNavigate();

    const [nicList, setNICList] = useState([]);
    const [selectnicList, setSelectNICList] = useState([]);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [reportList, setReportList] = useState([]);
    const [head, setHead] = useState("");

    useEffect(() => {
        getAllActive().then((result) => {
            var list = result.map((data) => {
                return { value: data._id, label: "NIC : "+data.nic+" "+"Appointment id : "+data._id};
            })
            setNICList(list);
        });
    }, [])

    function appointmentBillGet(){

        if (selectnicList.length === 0) {
            swal("NIC not selected");
        } 
        else {
            navigate("/CustomerBill",{
                state: {
                    id: selectnicList.value
                }
            });
        }
    }


    function appointmentReportGet() {
        if (startDate === '') {
            swal("Start date not selected");
        } else if (endDate === '') {
            swal("End date not selected");
        } else {
            appointmentReport({ startDate: startDate, endDate: endDate }).then((result) => {
                console.log(result);
                setReportList(result.details);
                setHead(result.status);
            });
        }
    }


    function downloadPDF() {
      
        const doc = new jsPDF();
        doc.setDrawColor(8, 30, 61);
        doc.setLineWidth(90);    
        doc.line(0, 0, 1000, 0); 
        doc.addImage(logo, 'PNG', 73, 10, 80, 20)
        //
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'bold')
        doc.text("Total Appintment", 14, 80)
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'Normal')
        doc.text(":  " + appointmentCount.toString(), 45, 80)
        //
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'bold')
        doc.text("Total Guest", 14, 85)
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'Normal')
        doc.text(":  " + guestCount.toString(), 45, 85)
        //
        // doc.setFontSize('10')
        // doc.setFont('Helvertica', 'bold')
        // doc.text("Report Start Date ", 14, 90)
        // doc.setFontSize('10')
        // doc.setFont('Helvertica', 'Normal')
        // doc.text(":  " + newStartDate.toString(), 45, 90)
        //
        // doc.setFontSize('10')
        // doc.setFont('Helvertica', 'bold')
        // doc.text("Report End Date ", 14, 95)
        // doc.setFontSize('10')
        // doc.setFont('Helvertica', 'Normal')
        // doc.text(":  " + newEndDate.toString(), 45, 95)
        //
        doc.autoTable({
            theme: "grid",
            head: [['NIC', 'Guest', 'Night', 'Room', 'Appointment Date', 'Bill']],
            body: reportList.map(col => [[col.nic], [col.guest], [col.night], [col.room], [col.appointmentDate], [col.appointmentDate]]),
            margin: { top: 100 }
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
                                    <p style={{ fontWeight: 'bold', marginTop: -10 }}>Customer Bill</p>
                                    <div class="row  align-items-center" >
                                        <div class="mb-3 col-md-10">
                                            <label for="inputEmail4">NIC</label>
                                            <Select class="form-control" options={nicList} onChange={setSelectNICList} />
                                        </div>
                                        <div class="col-md-2 " >
                                            <button type="submit" class="btn  btn-primary " id="addCustomer" style={{ backgroundColor: '#081E3D', borderColor: '#081E3D', color: '#fff', marginLeft: 50 }} onClick={() => appointmentBillGet()}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-body" >
                                    <p style={{ fontWeight: 'bold', marginTop: -10 }}>Appointment Report</p>
                                    <div class="row  align-items-center" >
                                        <div class="mb-3 col-md-5">
                                            <label for="inputEmail4">Start Date</label>
                                            <input type="date" class="form-control" name="appointment" data-date-format="DD MMMM YYYY" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                                        </div>
                                        <div class="mb-3 col-md-5">
                                            <label for="inputEmail4">End Date</label>
                                            <input type="date" class="form-control" name="appointment" data-date-format="DD MMMM YYYY" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                                        </div>
                                        <div class="col-md-2 " >
                                            <button type="submit" class="btn  btn-primary " id="addCustomer" style={{ backgroundColor: '#081E3D', borderColor: '#081E3D', color: '#fff', marginLeft: 50 }} onClick={() => appointmentReportGet()} >Submit</button>
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
                                                    <th>NIC</th>
                                                    <th>guest</th>
                                                    <th>Night</th>
                                                    <th>Room</th>
                                                    <th>Date</th>
                                                </tr>
                                            </thead>

                                            <tbody>

                                                {reportList.map((value, index) => {
                                                    return <tr key={index}>
                                                        <td>{value.nic}</td>
                                                        <td>{value.guest}</td>
                                                        <td>{value.night}</td>
                                                        <td>{value.room}</td>
                                                        <td>{value.appointmentDate}</td>
                                                        <div class="d-xxl-none">  { appointmentCount = appointmentCount + 1}</div>
                                                        <div class="d-xxl-none">  { guestCount = guestCount + value.guest}</div>
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

