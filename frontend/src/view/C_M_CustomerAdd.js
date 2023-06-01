import React, { useState, useEffect } from "react";
import Navbar from "../components/C_M_Navbar";
import swal from "sweetalert";

//css
import "./C_M_CustomerAdd.css";

//js
import "../js/app.js";

// Controllers
import { addCustomer } from "../controllers/customer";

export default function C_M_CustomerAdd() {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerNIC, setCustomerNIC] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const validateNIC = (nic) => {
    return nic.match(/[0-9]{9}[V|X|v|x]/) || nic.match(/[0-9]{12}/);
  };

  const validateMobileNumber = (number) => {
    return number.match(/[0-9]{10}/);
  };

  function insertCustomer() {
    if (
      customerName === "" &&
      customerEmail === "" &&
      customerAddress === "" &&
      customerNIC === "" &&
      customerPhone === ""
    ) {
      swal("All field are empty..");
    } else if (customerName === "") {
      swal("Name field is empty");
    } else if (!validateEmail(customerEmail)) {
      swal("Enter a valid email");
    } else if (customerEmail === "") {
      swal("Email field is empty");
    } else if (customerAddress === "") {
      swal("Address field is empty");
    } else if (!validateNIC(customerNIC)) {
      swal("Enter a valid NIC");
    } else if (customerNIC === "") {
      swal("NIC field is empty");
    } else if (!validateMobileNumber(customerPhone)) {
      swal("Enter a valid Contact number");
    } else if (customerPhone === "") {
      swal("Contact No field is empty");
    } else if (
      customerName === "" ||
      customerEmail === "" ||
      customerAddress === "" ||
      customerNIC === "" ||
      customerPhone === ""
    ) {
      swal("fields are empty");
    } else {
      addCustomer({
        name: customerName,
        email: customerEmail,
        address: customerAddress,
        nic: customerNIC,
        contactNo: customerPhone,
        state: "Active",
      }).then((result) => {
        if (result.status) {
          swal({
            title: "Success!",
            text: "New Customer Add Successfully",
            icon: "success",
            timer: 2000,
            button: false,
          });

          setCustomerName("");
          setCustomerEmail("");
          setCustomerAddress("");
          setCustomerNIC("");
          setCustomerPhone("");

          // setTimeout(() => {
          //     window.location.reload(true);
          // }, 2050)
        } else {
          swal({
            title: "Error!",
            text: "New Customer Add Unsuccessfully",
            icon: "error",
            timer: 2000,
            button: false,
          });
        }
      });
    }
  }

  function resetForm() {
    if (
      customerName === "" &&
      customerEmail === "" &&
      customerAddress === "" &&
      customerNIC === "" &&
      customerPhone === ""
    ) {
      swal("fields are already empty");
    }
    setCustomerName("");
    setCustomerEmail("");
    setCustomerAddress("");
    setCustomerNIC("");
    setCustomerPhone("");
  }

  return (
    <div class="wrapper">
      <Navbar />
      <div class="main">
        <main class="content">
          <div class="container-fluid">
            <div class="header">
              <h1 class="header-title">Add Customer</h1>
            </div>

            <div class="col-md-12">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="inputEmail4">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        name="name"
                        required
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="inputPassword4">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        name="email"
                        required
                      />
                    </div>
                  </div>

                  <div class="mb-3 ">
                    <label for="inputAddress">Address</label>
                    <input
                      type="text"
                      class="form-control"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      id="inputAddress"
                      name="address"
                      required
                    />
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="inputCity">NIC</label>
                      <input
                        type="text"
                        class="form-control"
                        value={customerNIC}
                        onChange={(e) => setCustomerNIC(e.target.value)}
                        name="nic"
                        required
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="inputCity">Contact No</label>
                      <input
                        type="text"
                        class="form-control"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        name="contactNo"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    class="btn  btn-primary"
                    id="addCustomer"
                    style={{
                      backgroundColor: "#081E3D",
                      borderColor: "#081E3D",
                      color: "#fff",
                    }}
                    onClick={() => insertCustomer()}
                  >
                    Submit
                  </button>
                  <button
                    type="submit"
                    class="btn  btn-primary"
                    id="addCustomer"
                    style={{
                      backgroundColor: "#ffffff",
                      borderColor: "#081E3D",
                      color: "#081E3D",
                      marginLeft: 10,
                      width: 75,
                    }}
                    onClick={() => resetForm()}
                  >
                    Reset
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
