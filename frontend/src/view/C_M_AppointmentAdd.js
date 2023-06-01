import React, { useState, useEffect } from 'react';
import Navbar from '../components/C_M_Navbar';
import swal from 'sweetalert';
import Select from 'react-select'

import $ from 'jquery';

//css
import './C_M_AppointmentAdd.css';

//js
import '../js/app.js';

// Controllers
import { addAppointment } from '../controllers/appointment';
import { getAllCustomers } from '../controllers/customer';


export default function C_M_AppointmentAdd() {

    const [guest, setGuest] = useState(1);
    const [night, setNight] = useState(1);
    const [room, setRoom] = useState(1);
    // const [nic, setNic] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
  

    const [nicList, setNICList] = useState([]);
    const [selectnicList, setSelectNICList] = useState([]);
    const nic = selectnicList.value;

    useEffect(() => {
        getAllCustomers().then((result) => {
            console.log(result);
            var list = result.map((data) => {
                return { value: data.nic, label: data.nic };
            })
            setNICList(list);
        });
    }, [])

  
    const validateNIC = (nic) => {
        return (nic.match(/[0-9]{9}[V|X|v|x]/) || (nic.match(/[0-9]{12}/)));
    };



    function insertAppointment() {

        if (nic === '' && guest === '' && night === '' && room === '' && appointmentDate === '') {
            swal("All field is empty..");
        } else if (nic === '') {
            swal("NIC field is empty");
        }else if (!validateNIC(nic)) {
            swal("Enter a valid NIC");
        } else if (guest === '') {
            swal("Number of guest field is empty");
        } else if (night === '') {
            swal("Number of night field is empty");
        } else if (room === '') {
            swal("Number of room field is empty");
        } else if (appointmentDate === '') {
            swal("Appointment date field is empty");
        } else if (nic === '' || guest === '' || night === '' || room === '' || appointmentDate === '') {
            swal("fields are empty");
        } else {
            addAppointment({ nic: nic, guest: guest, night: night, room: room, appointmentDate: appointmentDate, state: 'Pending' }).then((result) => {
                if (result.status) {
                    swal({
                        title: "Success!",
                        text: "New Appointment Add Successfully",
                        icon: 'success',
                        timer: 2000,
                        button: false,
                    });

                  

                    setTimeout(() => {
                        window.location.reload(true);
                    }, 2050)

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
        }, 2050)
    }

    return (

        <div class="wrapper">
            <Navbar />
            <div class="main">

                <main class="content">
                    <div class="container-fluid">

                        <div class="header">
                            <h1 class="header-title">
                                Add Appointment
                            </h1>

                        </div>

                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-body" >

                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label for="inputEmail4">NIC</label>
                                            {/* <input type="text" class="form-control" value={nic} onChange={(e) => setNic(e.target.value)} name="name" required /> */}
                                            <Select class="form-control" options={nicList} onChange={setSelectNICList} />
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="inputPassword4">Number of Guests</label>
                                                            <input type="number" class="form-control text-center" min={1} max={50}  value={guest} onChange={(e) => setGuest(e.target.value)} />
                                                            {/* <span class="input-group-btn">
                                                                <button class="btn btn-default" onClick={() => minus()}  data-dir="dwn"><i class="align-middle fas fa-fw fa-minus"></i></button>
                                                            </span>
                                                            <span class="input-group-btn">
                                                                <button class="btn btn-default" onClick={() => plus()} data-dir="up"><i class="align-middle fas fa-fw fa-plus"></i></button>
                                                            </span> */}
                                        </div>
                                    </div>


                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label for="inputCity">Number of Nights</label>
                                            <input type="number" class="form-control text-center" min={1} max={50}  value={night} onChange={(e) => setNight(e.target.value)} />
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="inputCity">Number of Rooms</label>
                                            <input type="number" class="form-control text-center" min={1} max={50}  value={room} onChange={(e) => setRoom(e.target.value)} />
                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                        <label for="inputCity">Appointment Date</label>
                                            <input type="date" class="form-control" name="appointment"  value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
                                        </div>
                                    </div>

                                   


                                    <button type="submit" class="btn  btn-primary" id="addCustomer" style={{ backgroundColor: '#081E3D', borderColor: '#081E3D', color: '#fff' }}  onClick={() => insertAppointment()}>Submit</button>
                                    <button type="submit" class="btn  btn-primary" id="addCustomer" style={{ backgroundColor: '#ffffff', borderColor: '#081E3D', color: '#081E3D', marginLeft: 10, width: 75 }} onClick={() => resetForm()} >Reset</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>


    )

}

