import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import Select from "react-select";
import { useNavigate } from 'react-router-dom';
import { reactBaseURL } from '../config';

//css
import '../css/modern.css';

//js
import '../js/app.js';

// Controllers
import { logIn } from '../controllers/customer';
import { getActiveAppointmentByCustomer } from '../controllers/appointment';


export default function CustomerLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [nic, setNic] = useState('');

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const validateNIC = (nic) => {
        return (nic.match(/[0-9]{9}[V|X|v|x]/) || (nic.match(/[0-9]{12}/)));
    };

    function login() {

        if (email === '' && nic === '') {
            swal("All field is empty..");
        } else if (email === '') {
            swal("Email field is empty");
        } else if (!validateEmail(email)) {
            swal("Enter a valid email");
        } else if (nic === '') {
            swal("NIC field is empty");
        } else if (!validateNIC(nic)) {
            swal("Enter a valid NIC");
        } else {
            logIn({ email: email, nic: nic }).then((result) => {
                if (result.status) {
                    getActiveAppointmentByCustomer({ nic: result.details.nic }).then((data) => {
                        if (data.status) {
                            swal({
                                title: "Success!",
                                text: "Customer Login Successfully",
                                icon: 'success',
                                timer: 2000,
                                button: false,
                            });

                            setTimeout(() => {
                                navigate("/CustomerBill", {
                                    state: {
                                        id: data.details._id
                                    }
                                });
                            }, 2000);

                        } else {
                            swal({
                                title: "Error!",
                                text: "Incorect Credential",
                                icon: 'error',
                                timer: 2000,
                                button: false
                            });
                        }
                    });
                } else {
                    swal({
                        title: "Error!",
                        text: "Incorect Credential",
                        icon: 'error',
                        timer: 2000,
                        button: false
                    });
                }
                
            });
        }
    }

    return (

        <body class="theme-blue">
            <main class="main h-100 w-100">
                <div class="container h-100">
                    <div class="row h-100">
                        <div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                            <div class="d-table-cell align-middle">
                                <div class="card" style={{ marginTop: 100 }}>
                                    <div class="card" style={{ backgroundColor: '#081E3D', padding: 20, borderRadius: 0, alignItems: 'center', marginBottom: -10 }} >
                                        <img style={{ maxWidth: 100 }} src={require('../img/logo/logo.png')} />
                                    </div>
                                    <div class="card-body">
                                        <div class="m-sm-4">

                                            <div class="mb-3">
                                                <label>Email</label>
                                                <input class="form-control " type="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                            <div class="mb-3">
                                                <label>NIC</label>
                                                <input class="form-control " type="password" name="password" placeholder="Enter your NIC" value={nic} onChange={(e) => setNic(e.target.value)} />
                                            </div>

                                            <div class="text-center mt-3">
                                                <button type="submit" class="btn  btn-primary" id="addCustomer" style={{ backgroundColor: '#081E3D', borderColor: '#081E3D', color: '#fff' }} onClick={() => login()} >Sign in</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>



        </body>

    )

}

