import React from 'react';
import { Link } from 'react-router-dom';
// import  '../App.css';

// import {BiHomeAlt,BiClipboard,BiCar,BiCart,BiMessageSquareAdd} from 'react-icons/bi';

export default function V_M_Navbar() {
    return (
      <nav id="sidebar" class="sidebar">
        <Link to="/vehicleDashboard" class="sidebar-brand">
          {" "}
          <img
            style={{ maxWidth: 50 }}
            src={require("../img/logo/logo.png")}
          />{" "}
          DELICACY INN{" "}
        </Link>

        <div class="sidebar-content">
          <div class="sidebar-user">
            <div>
              {" "}
              <Link to="/vehicleDashboard">
                {" "}
                <img
                  src={require("../img/avatars/avatar-2.jpg")}
                  class="img-fluid rounded-circle mb-2"
                />
              </Link>
            </div>
            <div class="fw-bold">Shehan Liyanage</div>
            <small>Vehicle Manager</small>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </div>

          <ul class="sidebar-nav">
            <li class="sidebar-item ">
              <Link class="sidebar-link" to="/vehicleDashboard">
                <i class="align-middle me-2 fas fa-fw fa-home"></i>{" "}
                <span class="align-middle">Dashboards</span>
              </Link>
            </li>
            <li class="sidebar-item ">
              <Link class="sidebar-link" to="/vehicle-customer-request">
                <i class="align-middle me-2 fas fa-fw fa-home"></i>{" "}
                <span class="align-middle">Customer Request</span>
              </Link>
            </li>
            <li class="sidebar-item ">
              <Link class="sidebar-link" to="/vehicleAdd">
                <i class="align-middle me-2 fas fa-fw fa-home"></i>{" "}
                <span class="align-middle">Add Vehicle</span>
              </Link>
            </li>

            <li class="sidebar-item ">
              <Link class="sidebar-link" to="/vihicleList">
                <i class="align-middle me-2 fas fa-fw fa-home"></i>{" "}
                <span class="align-middle">Vehicle list</span>
              </Link>
            </li>

            <li class="sidebar-item ">
              <Link class="sidebar-link" to="/vehicleReport">
                <i class="align-middle me-2 fas fa-fw fa-home"></i>{" "}
                <span class="align-middle">Reports</span>
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
    );
}




