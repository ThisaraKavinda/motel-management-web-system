import React from 'react';
import { Link } from 'react-router-dom';
// import  '../App.css';

// import {BiHomeAlt,BiClipboard,BiCar,BiCart,BiMessageSquareAdd} from 'react-icons/bi';

export default function C_M_Navbar() {
    return (
        <nav id="sidebar" class="sidebar">

            <Link to='/' class="sidebar-brand" > <img style={{ maxWidth: 50 }} src={require('../img/logo/logo.png')} /> DELICACY INN </Link>

            <div class="sidebar-content">
                <div class="sidebar-user">
                    <div> <Link to='/customerDashboard'> <img src={require('../img/avatars/avatar.jpg')} class="img-fluid rounded-circle mb-2" /></Link></div>
                    <div class="fw-bold">Hirusha Ravishan</div>
                    <small>Customer Manager</small>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </div>





                <ul class="sidebar-nav">
                    <li class="sidebar-item ">
                        <Link class="sidebar-link" to='/customerDashboard'>
                            <i class="align-middle me-2 fas fa-fw fa-home"></i> <span class="align-middle">Dashboards</span>
                        </Link>

                    </li>

                    <li class="sidebar-item ">
                        <a data-bs-target="#customer" data-bs-toggle="collapse" class="sidebar-link collapsed">
                            <i class="align-middle me-2 fas fa-fw fa-user-friends"></i> <span class="align-middle">Customers</span>
                        </a>
                        <ul id="customer" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            <li class="sidebar-item"><Link to='/customerAdd' class="sidebar-link" >Add Customer</Link></li>
                            <li class="sidebar-item"><Link to='/customerView' class="sidebar-link" >View Customers</Link></li>
                        </ul>
                    </li>

                    <li class="sidebar-item">
                        <a data-bs-target="#sim" data-bs-toggle="collapse" class="sidebar-link collapsed">
                            <i class="align-middle me-2 fas fa-fw fa-file-download"></i> <span class="align-middle">Appointment</span>
                        </a>
                        <ul id="sim" class="sidebar-dropdown list-unstyled collapse " data-bs-parent="#sidebar">
                            <li class="sidebar-item"><Link to='/appointmentAdd' class="sidebar-link" >Add Appointment</Link></li>
                            <li class="sidebar-item"><Link to='/appointmentView' class="sidebar-link" >View Appointment</Link></li>
                        </ul>
                    </li>

                    <li class="sidebar-item">
                        <a data-bs-target="#package" data-bs-toggle="collapse" class="sidebar-link collapsed">
                            <i class="align-middle me-2 fas fa-fw fa-bookmark"></i> <span class="align-middle">Vehicle Booking</span>
                        </a>
                        <ul id="package" class="sidebar-dropdown list-unstyled collapse " data-bs-parent="#sidebar">
                            <li class="sidebar-item"><Link to='/vehicleBookingAdd' class="sidebar-link" href="packagePage">Add Booking</Link></li>
                            <li class="sidebar-item"><Link to='/vehicleBookingView' class="sidebar-link" href="packageTypePage">View Booking</Link></li>
                        </ul>
                    </li>

                    <li class="sidebar-item ">
                        <Link class="sidebar-link" to='/customerReport'>
                            <i class="align-middle me-2 fas fa-fw fa-home"></i> <span class="align-middle">Report</span>
                        </Link>
                    </li>

                    <li class="sidebar-item ">
                        <Link class="sidebar-link" to='/'>
                            <i class="align-middle me-2 fas fa-fw fa-home"></i> <span class="align-middle">Log Out</span>
                        </Link>
                    </li>





                </ul>
            </div>
        </nav>
    )
}




