import React, { useState, useEffect } from "react";
import Navbar from "../components/C_M_Navbar";
import { useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { reactBaseURL } from "../config";
import Select from "react-select";

import $ from "jquery";

//components
import FormInput from "../components/FormInput";
import FormInputNumber from "../components/FormInputNumber";
import FormInputDate from "../components/FormInputDate";

//css
import "./C_M_AppointmentEdit.css";

//js
import "../js/app.js";

// Controllers
import {
  getSelectedAppointment,
  editAppointment,
} from "../controllers/appointment";

export default function C_M_AppointmentEdit(props) {
  const stateAppointmen = [
    { value: "Pending", label: "Pending" },
    { value: "Active", label: "Active" },
    { value: "Done", label: "Done" },
    { value: "Cancel", label: "Cancel" },
  ];

  const { id } = useParams();

  const [appointmentData, setAppointmentData] = useState([]);

  const [selectedType, setSelectedType] = useState({});

  useEffect(() => {
    getSelectedAppointment(id).then((result) => {
      console.log(result);
      setAppointmentData(result);
      setSelectedType({ label: result.state, value: result.state });
    });
  }, []);

  const [guest, setGuest] = useState(appointmentData.guest);
  const [night, setNight] = useState(appointmentData.night);
  const [room, setRoom] = useState(appointmentData.room);
  const [nic, setNic] = useState(appointmentData.nic);
  const [appointmentDate, setAppointmentDate] = useState(
    appointmentData.appointmentDate
  );

  const guestSetHandler = (data) => {
    setGuest(data);
  };
  const nightSetHandler = (data) => {
    setNight(data);
  };
  const roomSetHandler = (data) => {
    setRoom(data);
  };

  const appointmentSetHandler = (data) => {
    setAppointmentDate(data);
  };

  function editMyAppointment(id) {
    swal({
      title: "Are you sure?",
      text: "Do you want to change customer details!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        editAppointment({
          _id: id,
          guest: guest,
          night: night,
          room: room,
          appointmentDate: appointmentDate,
          state: selectedType.label,
        }).then((result) => {
          if (result.status) {
            swal({
              title: "Success!",
              text: "Appointment Update Successfully",
              icon: "success",
              timer: 2000,
              button: false,
            });

            setTimeout(() => {
              window.location.replace(reactBaseURL + "/appointmentView");
            }, 2050);
          } else {
            swal({
              title: "Error!",
              text: "Appointment Update Unsuccessfully",
              icon: "error",
              timer: 2000,
              button: false,
            });
          }
        });
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
              <h1 class="header-title">Update Appointment</h1>
            </div>

            <div class="col-md-12">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="inputEmail4">NIC</label>
                      <input
                        type="text"
                        class="form-control"
                        name="place"
                        placeholder={appointmentData.nic}
                        disabled
                      />
                      {/* <FormInput value={appointmentData.nic} title="number" onSave={nicSetHandler} /> */}
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="inputPassword4">Number of Guests</label>
                      <FormInputNumber
                        value={appointmentData.guest}
                        title="number"
                        onSave={guestSetHandler}
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="inputCity">Number of Nights</label>
                      <FormInputNumber
                        value={appointmentData.night}
                        title="number"
                        onSave={nightSetHandler}
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="inputCity">Number of Rooms</label>
                      <FormInputNumber
                        value={appointmentData.room}
                        title="number"
                        onSave={roomSetHandler}
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="inputCity">Appointment Date</label>
                      <FormInputDate
                        value={appointmentData.appointmentDate}
                        title="number"
                        onSave={appointmentSetHandler}
                      />
                    </div>

                    <div class="mb-3 col-md-6">
                      <label for="inputEmail4">State</label>
                      <Select
                        options={stateAppointmen}
                        hideSelectedOptions={false}
                        getOptionLabel={(option) => option.label}
                        getOptionValue={(option) => option.value}
                        value={selectedType}
                        onChange={(e) => setSelectedType(e)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    onClick={() => editMyAppointment(id)}
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
