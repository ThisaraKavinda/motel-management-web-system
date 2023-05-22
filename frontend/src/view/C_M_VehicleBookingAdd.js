import React, { useState, useEffect } from 'react';
import Navbar from '../components/C_M_Navbar';
import swal from 'sweetalert';
import Select from 'react-select'
import SelectTime from '../components/FormInputTime'

import $ from 'jquery';

//css
import '../css/modern.css';

//js
import '../js/app.js';

// Controllers
import { addVehicleBooking } from '../controllers/vehicleBooking';
import { getAllActive } from '../controllers/appointment';


export default function C_M_VehicleBookingAdd() {

    const vehicleTypeOptions = [
        { value: "Van", label: "Van" },
        { value: "Car", label: "Car" },
        { value: "Bike", label: "Bike" },
        { value: "Truck", label: "Truck" }
    ];


    const [type, setVehicleType] = useState([]);
    const [nicList, setNICList] = useState([]);
    const [selectnicList, setSelectNICList] = useState([]);
    const [guest, setGuest] = useState(1);
    const [place, setPlace] = useState('');
    const [picUpDate, setPicUpDate] = useState('');
    const [picUpTime, setPicUpTime] = useState('');



    useEffect(() => {
        getAllActive().then((result) => {
            console.log(result);
            var list = result.map((data) => {
                return { value: data._id, label: data.nic };
            })
            setNICList(list);
        });
    }, [])

   



    function insertVehicleBooking() {

        if (selectnicList === '' && type === '' && guest === '' && place === '' && picUpDate === '' && picUpTime === '') {
            swal("All field is empty..");
        } else if (selectnicList === '') {
            swal("NIC field is empty");
        } else if (type === '') {
            swal("Vehicle Type field is empty");
        } else if (guest === '') {
            swal("Number of guest field is empty");
        } else if (place === '') {
            swal("Pick up place field is empty");
        } else if (picUpDate === '') {
            swal("Pick up date field is empty");
        } else if (picUpTime === '') {
            swal("Pick up time field is empty");
        } else if (selectnicList === '' || type === '' || guest === '' || place === '' || picUpDate === '' || picUpTime === '') {
            swal("fields are empty");
        } else {
            addVehicleBooking({ appointmentID: selectnicList.value, nic:selectnicList.label, type: type.label, guests: guest, places: place, date: picUpDate, time: picUpTime, state: 'pending' }).then((result) => {
                if (result.status) {
                    swal({
                        title: "Success!",
                        text: "New Vehicle Booking Add Successfully",
                        icon: 'success',
                        timer: 2000,
                        button: false,
                    });

                    setTimeout(() => {
                        window.location.reload(true);
                    }, 1000)



                } else {
                    swal({
                        title: "Error!",
                        text: "New Appointment Add Unsuccessfully",
                        icon: 'error',
                        timer: 2000,
                        button: false
                    });
                }
            });
        }




    }

    function resetForm(){
        setTimeout(() => {
            window.location.reload(true);
        }, 100)
    }

    return (

        <div class="wrapper">
            <Navbar />
            <div class="main">

                <main class="content">
                    <div class="container-fluid">

                        <div class="header">
                            <h1 class="header-title">
                                Add Vehicle Booking
                            </h1>

                        </div>

                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-body" >

                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label for="inputEmail4">NIC</label>
                                            <Select class="form-control" options={nicList} onChange={setSelectNICList} />
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="inputPassword4">Vehicle Type</label>
                                            <Select class="form-control" options={vehicleTypeOptions} onChange={setVehicleType} />
                                        </div>
                                    </div>


                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label for="inputCity">Number of Guests</label>
                                            <input type="number" class="form-control text-center" min={1} max={50} value={guest} onChange={(e) => setGuest(e.target.value)} />
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="inputCity">Pickup place</label>
                                            <input type="text" class="form-control" name="place" value={place} onChange={(e) => setPlace(e.target.value)} required />
                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label for="inputCity">Pickup Date</label>
                                            <input type="date" class="form-control" name="date" value={picUpDate} onChange={(e) => setPicUpDate(e.target.value)} required />
                                        </div>
                                        <div class="mb-3  col-md-6">
                                            <label class="form-label">Pickup Time</label>
                                            <SelectTime value={picUpTime} onSave={setPicUpTime}></SelectTime>
                                            {/* <input type="text" class="form-control" name="place" value={picUpTime} onChange={(e) => setPicUpTime(e.target.value)} placeholder="00:00" required /> */}
                                        </div>
                                    </div>




                                    <button type="submit" class="btn  btn-primary" id="addCustomer" style={{ backgroundColor: '#081E3D', borderColor: '#081E3D', color: '#fff' }} onClick={() => insertVehicleBooking()} >Submit</button>
                                    <button type="submit" class="btn  btn-primary" id="addCustomer" style={{ backgroundColor: '#ffffff', borderColor: '#081E3D', color: '#081E3D', marginLeft: 10, width: 75 }}   onClick={() => resetForm()} >Reset</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>


    )

}

