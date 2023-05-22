import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/C_M_Navbar';
import swal from 'sweetalert';
import Select from 'react-select'
import { reactBaseURL } from '../config';

//css
import '../css/modern.css';

//js
import '../js/app.js';

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';



// Controllers
import { deleteAppointment, getAllPending, getAllActive, getAllDone, getAllCancel, updateAppointmentState } from '../controllers/appointment';
import { getRooms, updateRoomState, updateRoomStateDone } from '../controllers/room';


export default function C_M_AppointmentView() {

    const [roomList, setRoomList] = useState([]);
    const [room, setRoom] = useState([]);

    const [appointmentList, setAppointmentList] = useState([]);


    useEffect(() => {
        getRooms().then((result) => {
            var list = result.map((data) => {
                return { value: data._id, label: data.name };
            })
            setRoomList(list);
        });

    }, [])



    useEffect(() => {
        getAllPending().then((result) => {
            setAppointmentList(result);
            //initialize datatable
            $(document).ready(function () {
                $('#example').DataTable();
            });
        });
    }, [])


    function deleteMyAppointment(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    deleteAppointment(id).then((result) => {
                        var appointment = appointmentList.filter((e) => e._id !== result._id);
                        setAppointmentList(appointment);
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


    function pending() {
        getAllPending().then((result) => {
            setAppointmentList(result);
        });
    }

    function active() {
        getAllActive().then((result) => {
            setAppointmentList(result);
        });
    }

    function done() {
        getAllDone().then((result) => {
            setAppointmentList(result);
        });
    }

    function cancel() {
        getAllCancel().then((result) => {
            setAppointmentList(result);
        });
    }

    function updateStatet(id, state) {
        if (state === "Active") {
            if (room.length === 0) {
                swal(" Room not selected..");
            } else {
                swal({
                    title: "Are you sure?",
                    text: "Add room to Appointment!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            updateRoomState({ roomArray: room, state: "1", appointment: id }).then((result) => {
                                if (result.status) {
                                    swal({
                                        title: "Success!",
                                        text: "Room Add Successfully",
                                        icon: 'success',
                                        timer: 2000,
                                    });
                                    updateAppointmentState({ _id: id, state: state }).then((result) => {
                                        getAllPending().then((result) => {
                                            setAppointmentList(result);
                                        });
                                    });
                                } else {
                                    swal({
                                        title: "Error!",
                                        text: "Room Add Unsuccessfully",
                                        icon: 'error',
                                        timer: 2000,
                                        button: false,
                                    });
                                }
                            });
                        }
                        setTimeout(() => {
                            window.location.replace(reactBaseURL + "/appointmentView");
                        }, 2050)

                    });
            }

        } else if (state === "Cancel") {
            updateAppointmentState({ _id: id, state: state }).then((result) => {
                getAllPending().then((result) => {
                    setAppointmentList(result);
                });
            });
        } else {
            updateRoomStateDone({ id: id }).then((result) => {
                if (result.status) {
                    updateAppointmentState({ _id: id, state: state }).then((result) => {

                        getAllActive().then((result) => {
                            setAppointmentList(result);
                        });
                    });
                } else {
                    swal("Error");
                }


            });
        }
    }



    return (

        <div class="wrapper">
            <Navbar />
            <div class="main">


                <main class="content">
                    <div class="container-fluid">

                        <div class="header">

                            <h1 class="header-title">
                                View Appointments
                            </h1>
                            <br></br>
                            <div class="btn-group  mb-3" role="group" aria-label="Large button group">
                                <button onClick={() => pending()} type="button" class="btn btn-secondary">Pending</button>
                                <button onClick={() => active()} type="button" class="btn btn-secondary">Active</button>
                                <button onClick={() => done()} type="button" class="btn btn-secondary">Done</button>
                                <button onClick={() => cancel()} type="button" class="btn btn-secondary">Cancel</button>
                            </div>
                        </div>


                        <div class="col-12" style={{ marginTop: -5 }}>
                            <div class="card">

                                <div class="card-body">

                                    <table id="example" class="table table-striped my">
                                        <thead>
                                            <tr>
                                                <th>NIC</th>
                                                <th>Guest</th>
                                                <th>Night</th>
                                                <th>Room</th>
                                                <th>Date</th>
                                                <th>Appointment Date</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {appointmentList.map((value, index) => {
                                                return <tr key={index}>
                                                    <td>{value.nic}</td>
                                                    <td>{value.guest}</td>
                                                    <td>{value.night}</td>
                                                    <td>{value.room}</td>
                                                    <td>{value.date}</td>
                                                    <td>{value.appointmentDate}</td>
                                                    <td>{value.state}</td>
                                                    {value.state === "Pending" ? <>
                                                        <td > <Select isMulti options={roomList} onChange={setRoom} /></td>
                                                    </>
                                                        :
                                                        ''
                                                    }
                                                    <td class="table-action text-center">

                                                        {value.state === "Pending" ? <>
                                                            <button class="btn btn-pill btn-primary btn-sm" style={{ marginLeft: 10, width: 60 }} onClick={() => updateStatet(value._id, "Active")}>Active</button>
                                                            <button class="btn btn-pill btn-danger btn-sm" style={{ marginLeft: 10, width: 60 }} onClick={() => updateStatet(value._id, "Cancel")}>Cancel</button>
                                                            <Link to={"/appointmentEdit/" + value._id} class="top-bar-link"><button class="btn btn-pill btn-success btn-sm" style={{ marginLeft: 10, width: 60 }}>Edit</button></Link>
                                                        </>
                                                            :
                                                            ''
                                                        }

                                                        {value.state === "Active" ? <>
                                                            <button class="btn btn-pill btn-primary btn-sm" style={{ marginLeft: 10, width: 60 }} onClick={() => updateStatet(value._id, "Done")}>Done</button>
                                                            <Link to={"/appointmentEdit/" + value._id} class="top-bar-link"><button class="btn btn-pill btn-success btn-sm" style={{ marginLeft: 10, width: 60 }}>Edit</button></Link>
                                                        </>
                                                            :
                                                            ''
                                                        }

                                                        {value.state === "Done" ? <>
                                                            <Link to={"/appointmentEdit/" + value._id} class="top-bar-link"><button class="btn btn-pill btn-success btn-sm" style={{ marginLeft: 10, width: 60 }}>Edit</button></Link>
                                                        </>
                                                            :
                                                            ''
                                                        }

                                                        {value.state === "Cancel" ? <>
                                                            <Link to={"/appointmentEdit/" + value._id} class="top-bar-link"><button class="btn btn-pill btn-success btn-sm" style={{ marginLeft: 10, width: 60 }}>Edit</button></Link>
                                                        </>
                                                            :
                                                            ''
                                                        }

                                                    </td>
                                                </tr>
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




    )

}







