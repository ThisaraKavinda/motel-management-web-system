import React, { useState, useEffect } from 'react';
import Navbar from '../components/C_M_Navbar';
import swal from 'sweetalert';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select'
import { reactBaseURL } from '../config';
import SelectTime from '../components/FormInputTime'

//components
import FormInput from '../components/FormInput';
import FormInputNumber from '../components/FormInputNumber';
import FormInputDate from '../components/FormInputDate';

//css
import '../css/modern.css';

//js
import '../js/app.js';

// Controllers
import { getSelectedVehicleBooking, editVehicleBooking } from '../controllers/vehicleBooking';
import { getSelectedAppointment, editAppointment } from '../controllers/appointment';


export default function C_M_VehicleBookingEdit() {

    const vehicleTypeOptions = [
        { value: "Van", label: "Van" },
        { value: "Car", label: "Car" },
        { value: "Bike", label: "Bike" },
        { value: "Truck", label: "Truck" }
    ];

    const { id } = useParams();

    const [bookingData, setBookingData] = useState([]);

    const [selectedType, setSelectedType] = useState({});

    const [guest, setGuest] = useState(bookingData.guests);
    const [place, setPlace] = useState(bookingData.places);
    const [picUpDate, setPicUpDate] = useState(bookingData.date);
    const [picUpTime, setPicUpTime] = useState(bookingData.time);

    useEffect(() => {
        getSelectedVehicleBooking(id).then((result) => {
            console.log(result)
            setBookingData(result);
            setSelectedType({ label: result.type, value: result.type });    
            setGuest(result.guests);
            setPlace(result.places);
            setPicUpDate(result.date);
            setPicUpTime(result.time);
        });
    }, [])

  

   

  
    const placeSetHandler = (data) => {
        setPlace(data);
    }
    const guestSetHandler = (data) => {
        setGuest(data);
    }
    const dateSetHandler = (data) => {
        setPicUpDate(data);
    }
    const timeSetHandler = (data) => {
        setPicUpTime(data);
    }


    function editMyBooking(id) {
     
        swal({
            title: "Are you sure?",
            text: "Do you want to change Booking details!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    editVehicleBooking({_id: id, type: selectedType.label, guest: guest, places: place, date: picUpDate, time: picUpTime}).then((result) => {
                       
                        if (result.status) {
                            swal({
                                title: "Success!",
                                text: "Vehicle booking Update Successfully",
                                icon: 'success',
                                timer: 2000,
                                button: false,
                            });

                            setTimeout(() => {
                                window.location.replace(reactBaseURL + "/vehicleBookingView");
                            }, 2050)
                        } else {
                            swal({
                                title: "Error!",
                                text: "Vehicle booking Update Unsuccessfully",
                                icon: 'error',
                                timer: 2000,
                                button: false
                            });
                        }
                    });

                  
                }
            });

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
                                Update Vehicle Booking
                            </h1>

                        </div>

                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-body" >

                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label for="inputEmail4">NIC</label>
                                            <input type="text" class="form-control" name="place" placeholder={bookingData.nic}  disabled />
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="inputPassword4">Vehicle Type</label>
                                            <Select
                                                class="form-control"
                                                options={vehicleTypeOptions}
                                                hideSelectedOptions={false}
                                                getOptionLabel={(option) => option.label}
                                                getOptionValue={(option) => option.value}
                                                value={selectedType}
                                                onChange={(e) => setSelectedType(e)}
                                            />
                                        </div>
                                    </div>


                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label for="inputCity">Number of Guests</label>
                                            <FormInputNumber value={bookingData.guests} title="number" onSave={guestSetHandler} />
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="inputCity">Pick up place</label>
                                            <FormInput value={bookingData.places} title="number" onSave={placeSetHandler} />
                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label for="inputCity">Pick up Date</label>
                                            <FormInputDate value={bookingData.date} title="number" onSave={dateSetHandler} />
                                        </div>
                                        <div class="mb-3  col-md-6">
                                            <label class="form-label">Pick up Time (00:00) </label>
                                            <SelectTime value={bookingData.time} title="number" onSave={timeSetHandler} />
                                        </div>
                                    </div>




                                    <button type="submit" class="btn  btn-primary" id="addCustomer" style={{ backgroundColor: '#081E3D', borderColor: '#081E3D', color: '#fff' }}  onClick={() => editMyBooking(id)} >Submit</button>
                                    <button type="submit" class="btn  btn-primary" id="addCustomer" style={{ backgroundColor: '#ffffff', borderColor: '#081E3D', color: '#081E3D', marginLeft: 10, width: 75 }}  onClick={() => resetForm()}   >Reset</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>


    )

}

