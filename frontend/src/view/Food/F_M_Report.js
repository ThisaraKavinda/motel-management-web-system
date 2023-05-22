import React, { useState, useEffect } from 'react';
import Navbar from '../../components/F_M_Navbar';
import swal from 'sweetalert';
import Select from 'react-select'
import $ from 'jquery';
import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import { Sugar } from 'react-preloaders2';

import logo from '../../img/logo/fullLogo.png';

//css
import '../../css/modern.css';
import './F_M_Report.css';

//js
import '../../js/app.js';

// Controllers
import {getOrdersForSelectedPeriod} from '../../controllers/foodCart';

import FoodReportPopup from '../../components/Food/FoodReportPopup'

export default function F_M_Report() {

    $("input").on("change", function () {
        this.setAttribute(
            "data-date",
            moment(this.value, "YYYY-MM-DD")
                .format(this.getAttribute("data-date-format"))
        )
    }).trigger("change")

    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate() + 1;
    let year = dateObj.getUTCFullYear()
    let prevMonth = month - 3;
    if (month < 10)
        month = "0" + month;
    if (prevMonth < 10)
        prevMonth = "0" + prevMonth;
    if (day < 10)
        day = "0" + day;
    let initalStartDate = year + "-" + prevMonth + "-" + day;
    let initalEndDate = year + "-" + month + "-" + day;

    const [startDate, setStartDate] = useState(initalStartDate);
    const [endDate, setEndDate] = useState(initalEndDate);

    const [reportList, setReportList] = useState([]);
    const [head, setHead] = useState(true);

    const [popupItem, setPopupItem] = useState({});
    const [isPopupActive, setIsPopupActive] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setStartDate(initalStartDate);
        setEndDate(initalEndDate);
        appointmentReportGet();
    }, [])

    const viewOnClickHandler = async (orderId, reservationId, nic, count, date, time, totalPrice) => {
        // console.log(id);
        await setPopupItem({
            orderId: orderId,
            reservationId: reservationId,
            nic: nic,
            count: count,
            date: date,
            time: time,
            totalPrice: totalPrice
        })
        await setIsPopupActive(true);
    }

    const closeOnClickHandler = async () => {
        await setPopupItem({});
        await setIsPopupActive(false)
    }

    async function appointmentReportGet() {
        await setLoading(true);
        if (startDate === '') {
            swal("Start date not selected");
        } else if (endDate === '') {
            swal("End date not selected");
        } else {
            setLoading(true);
            getOrdersForSelectedPeriod(startDate, endDate).then((result) => {
                setReportList(result);
                setHead(true);
            })
            .catch((err) => {
                swal({
                    title: "Error!",
                    text: "Something went wrong with the network. Try reloading page",
                    icon: 'error',
                    dangerMode: true,
                    button: true,
                })
                .then((reload) => {
                    window.location.reload();
                });
            })
            .then ((result) => {
                result.json()
            })
            .then(json => {
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            });
        }
    }

    function downloadPDF() {

        const doc = new jsPDF();
        doc.setDrawColor(8, 30, 61);
        doc.setLineWidth(70);    
        doc.line(0, 0, 1000, 0); 
        doc.addImage(logo, 'PNG', 85, 4, 40, 10)

        doc.setFontSize('18')
        doc.setTextColor(255,255,255);
        doc.setFont('Helvertica', 'bold')
        doc.text("Food & Beverage Orders Report", 63, 20)
        //
        doc.setFontSize('12')
        doc.setFont('Helvertica', 'Normal')
        doc.text("Report generated on: ", 68, 27)
        doc.setFontSize('12')
        doc.setFont('Helvertica', 'bold')
        doc.text(new Date().toISOString().substring(0, 10) + " " + new Date().toLocaleTimeString('en-US'), 105, 27)

        doc.setTextColor(0,0,0);
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'bold')
        doc.text("Report Start Date ", 14, 47)
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'Normal')
        doc.text(":  " + startDate, 45, 47)
        
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'bold')
        doc.text("Report End Date ", 147, 47)
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'Normal')
        doc.text(":  " + endDate, 176, 47)

        doc.setFontSize('10')
        doc.setFont('Helvertica', 'bold')
        doc.text("Total Orders", 14, 55)
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'Normal')
        doc.text(":  " + reportList.length, 45, 55)
        
        doc.autoTable({
            theme: "grid",
            head: [['Reservation Id', 'NIC', 'Item count', 'Date', 'Time', 'Total Price']],
            body: reportList.map(col => [[col.reservationId], [col.nic], [col.count], [col.date], [col.time], ["Rs. " + col.totalPrice + ".00"]]),
            margin: { top: 65 }
        })
        doc.save('FoodOrderReport(' + startDate + '-' + endDate + ').pdf')
    }

    return (

        <React.Fragment>
        <div class="wrapper">
            <Navbar />
            <div class="main">

                <main class="content">
                    <div class="container-fluid">

                        <div class="header">
                            <h1 class="header-title">
                                Food & Beverage Order Report
                            </h1>

                        </div>

                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-body mt-3 mb-2" style={{ margin: "0px" }} >
                                    <div class="row mb-2 px-4">
                                        <h5 class="fw-semibold">Select the start date and end date to generate the report</h5>
                                    </div>

                                    <div class="row  align-items-center px-4 mb-2" >
                                        <div class="mb-3 col-md-5">
                                            <label for="inputEmail4">Start Date</label>
                                            <input type="date" class="form-control" name="appointment" data-date-format="DD MMMM YYYY" value={startDate} 
                                            onChange={(e) => setStartDate(e.target.value)} defaultValue={initalStartDate} required />
                                        </div>
                                        <div class="mb-3 col-md-5">
                                            <label for="inputEmail4">End Date</label>
                                            <input type="date" class="form-control" name="appointment" data-date-format="DD MMMM YYYY" value={endDate} 
                                            onChange={(e) => setEndDate(e.target.value)} defaultValue={initalEndDate} required />
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
                                                    <th class="text-center">Order Id</th>
                                                    <th class="text-center">Reservation Id</th>
                                                    <th class="text-center">NIC</th>
                                                    <th class="text-center">Date</th>
                                                    <th class="text-center">Time</th>
                                                    <th class="text-center">Item Count</th>
                                                    <th class="text-center">Total Amount</th>
                                                </tr>
                                            </thead>

                                            <tbody>

                                                {reportList.map((value, index) => {
                                                    return <tr key={index} onClick={viewOnClickHandler.bind(this, value.orderId, value.reservationId, 
                                                        value.nic, value.count, value.date, value.time, value.totalPrice)} id="OrderId">
                                                        <td class="text-center">{value.orderId}</td>
                                                        <td class="text-center">{value.reservationId}</td>
                                                        <td class="text-center">{value.nic}</td>
                                                        <td class="text-center">{value.date}</td>
                                                        <td class="text-center">{value.time}</td>
                                                        <td class="text-center">{value.count}</td>
                                                        <td class="text-center">Rs. {value.totalPrice}.00</td>
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

                    {isPopupActive ? <FoodReportPopup item={popupItem} closeOnClickHandler={closeOnClickHandler}/> : null}
                </main>
            </div>
        </div>
        <Sugar customLoading={loading} background="blur"/>
        </React.Fragment>


    )

}

