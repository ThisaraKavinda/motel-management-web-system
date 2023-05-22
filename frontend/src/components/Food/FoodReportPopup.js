import React, { useState, useEffect } from "react";

import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import swal from 'sweetalert';

import {getSelectedCustomerByNic} from '../../controllers/customer';
import {getRecordsForAOrder} from '../../controllers/foodCart'

import logo from '../../img/logo/fullLogo.png';

export default function FoodReportPopup(props) {

    const [item, setItem] = useState(props.item);
    const [name, setName] = useState("");
    const [itemList,setItemList] = useState([]);

    useEffect(() => {
        setItem(props.item);
        getSelectedCustomerByNic(props.item.nic).then((res) => {
            // console.log(res)
            setName(res.name)
        })
        getRecordsForAOrder(props.item.orderId).then((res) => {
            // console.log(res);
            setItemList(res);
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
    }, [props.item])

    const closeOnClickHandler = () => {
        props.closeOnClickHandler();
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
        doc.text("Food & Beverage Order Report", 63, 20)
        //
        doc.setFontSize('12')
        doc.setFont('Helvertica', 'Normal')
        doc.text("Report generated on: ", 66, 27)
        doc.setFontSize('12')
        doc.setFont('Helvertica', 'bold')
        doc.text(new Date().toISOString().substring(0, 10) + " " + new Date().toLocaleTimeString('en-US'), 103, 27)

        doc.setTextColor(0,0,0);
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'bold')
        doc.text("Order Id: ", 14, 47)
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'Normal')
        doc.text("#" + item.orderId, 30, 47)

        doc.setFontSize('10')
        doc.setFont('Helvertica', 'bold')
        doc.text("Order Date: ", 14, 55)
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'Normal')
        doc.text(item.date, 34, 55)

        doc.setFontSize('10')
        doc.setFont('Helvertica', 'bold')
        doc.text("Order Time: ", 155, 55)
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'Normal')
        doc.text(item.time, 175, 55)

        doc.setFontSize('10')
        doc.setFont('Helvertica', 'bold')
        doc.text("Customer Name: ", 14, 61)
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'Normal')
        doc.text(name, 41, 61)

        doc.setFontSize('10')
        doc.setFont('Helvertica', 'bold')
        doc.text("Customer NIC: ", 149, 61)
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'Normal')
        doc.text(item.nic, 175, 61)

        doc.setFontSize('10')
        doc.setFont('Helvertica', 'bold')
        doc.text("Total Amount: ", 14, 67)
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'Normal')
        doc.text("Rs. " + item.totalPrice + ".00", 38, 67)
        
        doc.autoTable({
            theme: "grid",
            head: [['Item Id', 'Item name', 'Item price']],
            body: itemList.map(col => [[col.itemId], [col.itemName], [col.price]]),
            margin: { top: 75 }
        })
        doc.save('FoodOrderReport(#'  + item.orderId + ').pdf')
    }

    return (
        <div class="card border bg-light w-40 shadow" style={{position:'fixed', top:'23%', right:'25%', zIndex:1, width:"600px"
        , maxHeight:"520px", overflowY: "auto",  overflowX: "hidden"}}>
            <div class="row d-flex justify-content-end">
                <div class="col-1 mt-3 mx-4 d-flex justify-content-end">
                    <button type="button" class="btn-close" aria-label="Close" onClick={closeOnClickHandler}></button>
                </div>
            </div>
            <div class="row d-flex justify-content-center">
                <div class="col-auto my-2" >
                    <h5 class="fw-semibold monospace">Order Id : #{item.orderId} </h5>
                </div>
            </div>
            <div class="row d-flex justify-content-start mx-5">
                <div class="col-6 mt-2 mx-2" >
                    <p class="fw-semibold monospace mb-0">Name: {name} </p>
                </div>
                <div class="col-4 mt-2 mx-2" >
                    <p class="fw-semibold monospace mb-0">NIC: {item.nic} </p>
                </div>
            </div>
            <div class="row d-flex justify-content-start mx-5">
                <div class="col-6 mt-1 mx-2" >
                    <p class="fw-semibold monospace mb-0">Date: {item.date} </p>
                </div>
                <div class="col-4 mt-1 mx-2" >
                    <p class="fw-semibold monospace mb-0">Time: {item.time} </p>
                </div>
            </div>
            <div class="row d-flex justify-content-start mx-5">
                <div class="col-auto mt-1 mb-3 mx-2" >
                    <p class="fw-semibold monospace mb-0">Total Amount: Rs. {item.totalPrice}.00 </p>
                </div>
            </div>

            <div class="row d-flex justify-content-start mx-5 mt-1 mb-3">
                <div class="col-auto mx-2" >
                    <button class="btn  btn-primary" onClick={() => downloadPDF()} >Download PDF</button>
                </div>
            </div>

            <div class="row d-flex justify-content-center"> 
                <table id="example" class="table my mb-4" style={{width:'85%', border: "none"}}>
                    <thead>
                        <tr>
                            <th class="text-center">Item Id</th>
                            <th class="text-center">Item Name</th>
                            <th class="text-center">Price</th>
                        </tr>
                    </thead>
                    <tbody style={{border: "none"}}>
                        {itemList.map((value, index) => {
                            return (
                                <tr style={{border: "none"}} key={index}>
                                    <td class="text-center" style={{border: "none"}}>{value.itemId}</td>
                                    <td class="text-center" style={{border: "none"}}>{value.itemName}</td>
                                    <td class="text-center" style={{border: "none"}}>Rs. {value.price}</td>
                                    <td class="text-center" style={{border: "none"}}></td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>

        </div>
    )
}