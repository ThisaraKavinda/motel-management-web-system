import React from "react";
import { Link } from "react-router-dom";

export default function C_M_Navbar() {
  return (
    <nav id="sidebar" class="sidebar">
      <Link to="/" class="sidebar-brand">
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
            <Link to="/">
              {" "}
              <img
                src={require("../img/avatars/avatar.jpg")}
                class="img-fluid rounded-circle mb-2"
              />
            </Link>
          </div>
          <div class="fw-bold">Thisara Kavinda</div>
          <small>Food & Beverage Manager</small>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>

        <ul class="sidebar-nav">
          <li class="sidebar-item ">
            <Link class="sidebar-link" to="/foodDashboard">
              <i class="align-middle me-2 fas fa-fw fa-home"></i>{" "}
              <span class="align-middle">Dashboards</span>
            </Link>
          </li>

          <li class="sidebar-item ">
            <a
              data-bs-target="#customer"
              data-bs-toggle="collapse"
              class="sidebar-link collapsed"
            >
              <i class="align-middle me-2 fas fa-fw fa-user-friends"></i>{" "}
              <span class="align-middle">Food and Beverages</span>
            </a>
            <ul
              id="customer"
              class="sidebar-dropdown list-unstyled collapse"
              data-bs-parent="#sidebar"
            >
              <li class="sidebar-item">
                <Link to="/foodItemList" class="sidebar-link">
                  Foods
                </Link>
              </li>
              <li class="sidebar-item">
                <Link to="/foodItemList" class="sidebar-link">
                  Beverages
                </Link>
              </li>
              <li class="sidebar-item">
                <Link to="/foodItemList" class="sidebar-link">
                  Deserts
                </Link>
              </li>
            </ul>
          </li>

          <li class="sidebar-item">
            <a
              data-bs-target="#sim"
              data-bs-toggle="collapse"
              class="sidebar-link collapsed"
            >
              <i class="align-middle me-2 fas fa-fw fa-globe"></i>{" "}
              <span class="align-middle">Make an order</span>
            </a>
            <ul
              id="sim"
              class="sidebar-dropdown list-unstyled collapse "
              data-bs-parent="#sidebar"
            >
              <li class="sidebar-item">
                <Link to="/roomSelect" class="sidebar-link">
                  Select Room
                </Link>
              </li>
              <li class="sidebar-item">
                <Link to="/foodSelect" class="sidebar-link">
                  Select Food
                </Link>
              </li>
            </ul>
          </li>

          <li class="sidebar-item">
            <a
              data-bs-target="#package"
              data-bs-toggle="collapse"
              class="sidebar-link collapsed"
            >
              <i class="align-middle me-2 fas fa-fw fa-cubes"></i>{" "}
              <span class="align-middle">Manage items</span>
            </a>
            <ul
              id="package"
              class="sidebar-dropdown list-unstyled collapse "
              data-bs-parent="#sidebar"
            >
              <li class="sidebar-item">
                <Link to="/foodItemList" class="sidebar-link">
                  Food item list
                </Link>
              </li>
              <li class="sidebar-item">
                <Link to="/addNewItem" class="sidebar-link">
                  Add new item
                </Link>
              </li>
              <li class="sidebar-item">
                <Link to="/foodItemList" class="sidebar-link">
                  Edit Item
                </Link>
              </li>
            </ul>
          </li>

          <li class="sidebar-item ">
            <Link class="sidebar-link" to="/foodPaymentReport">
              <i class="align-middle me-2 fas fa-fw fa fa-list"></i>{" "}
              <span class="align-middle">Report</span>
            </Link>
          </li>

          <li class="sidebar-item ">
            <Link class="sidebar-link" to="/">
              <i class="align-middle me-2 fas fa-fw fa fa-home"></i>{" "}
              <span class="align-middle">Log Out</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
