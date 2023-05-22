import React from 'react';
import { Link } from 'react-router-dom';
// import  '../App.css';

// import {BiHomeAlt,BiClipboard,BiCar,BiCart,BiMessageSquareAdd} from 'react-icons/bi';

export default function E_M_Navbar() {
    return (
        <nav id="sidebar" class="sidebar">

            <Link to='/employeeDashboard' class="sidebar-brand" > <img style={{ maxWidth: 50 }} src={require('../img/logo/logo.png')} /> DELICACY INN </Link>

            <div class="sidebar-content">
                <div class="sidebar-user">
                    <div> <Link to='/employeeDashboard'> <img src={require('../img/avatars/avatar.jpg')} class="img-fluid rounded-circle mb-2" /></Link></div>
                    <div class="fw-bold">Thanushi Perera</div>
                    <small>Human Resource Manager</small>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </div>





                <ul class="sidebar-nav">
                    <li class="sidebar-item ">
                        <Link class="sidebar-link"to='/employeeDashboard'>
                            <i class="align-middle me-2 fas fa-fw fa-home"></i> <span class="align-middle">Dashboard</span>
                        </Link>

                    </li>

                    <li class="sidebar-item ">
                        <Link class="sidebar-link"to='/registration'>
                            <i class="align-middle me-2 fas fa-fw fa-user-plus"></i> <span class="align-middle">Registration</span>
                        </Link>

                    </li>

                    <li class="sidebar-item ">
                        <Link class="sidebar-link"to='/manageEmployee'>
                            <i class="align-middle me-2 fas fa-fw fa-users"></i> <span class="align-middle">Manage Employee</span>
                        </Link>

                    </li>
                    <li class="sidebar-item ">
                        <Link class="sidebar-link"to='/employeeReport'>
                            <i class="align-middle me-2 fas fa fa-credit-card"></i> <span class="align-middle">Report</span>
                        </Link>

                    </li>



                    <li class="sidebar-item ">
                        <Link class="sidebar-link"to='/'>
                            <i class="align-middle me-2 fas fa-fw fa-home"></i> <span class="align-middle">Logout</span>
                        </Link>

                    </li>


            



                </ul>
            </div>
        </nav>
    )
}




