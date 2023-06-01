import React, { useState, useEffect } from "react";
import Navbar from "../components/C_M_Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { reactBaseURL } from "../config";
import swal from "sweetalert";

//components
import FormInput from "../components/FormInput";

//css
import "./C_M_CustomerEdit.css";

//js
import "../js/app.js";

// Controllers
import { getSelectedCustomer, editCustomer } from "../controllers/customer";

export default function C_M_CustomerEdit(props) {
  const { id } = useParams();

  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    getSelectedCustomer(id).then((result) => {
      console.log(result);
      setCustomerData(result);
    });
  }, []);

  const [customerName, setCustomerName] = useState(customerData.name);
  const [customerEmail, setCustomerEmail] = useState(customerData.email);
  const [customerAddress, setCustomerAddress] = useState(customerData.address);
  const [customerNIC, setCustomerNIC] = useState(customerData.nic);
  const [customerPhone, setCustomerPhone] = useState(customerData.contactNo);

  const nameSetHandler = (data) => {
    setCustomerName(data);
  };
  const emailSetHandler = (data) => {
    setCustomerEmail(data);
  };
  const addressSetHandler = (data) => {
    setCustomerAddress(data);
  };
  const nicSetHandler = (data) => {
    setCustomerNIC(data);
  };
  const phoneSetHandler = (data) => {
    setCustomerPhone(data);
  };

  function editMyCustomer(id) {
    swal({
      title: "Are you sure?",
      text: "Do you want to change customer details!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        editCustomer({
          _id: id,
          name: customerName,
          email: customerEmail,
          address: customerAddress,
          nic: customerNIC,
          contactNo: customerPhone,
        }).then((result) => {
          if (result.status) {
            swal({
              title: "Success!",
              text: "Customer Update Successfully",
              icon: "success",
              timer: 2000,
              button: false,
            });

            setTimeout(() => {
              window.location.replace(reactBaseURL + "/customerView");
            }, 2050);
          } else {
            swal({
              title: "Error!",
              text: "Customer Update Unsuccessfully",
              icon: "error",
              timer: 2000,
              button: false,
            });
          }
        });

        swal({
          title: "Success!",
          text: "Customer Update Successfully",
          icon: "success",
          timer: 2000,
          button: false,
        });

        setTimeout(() => {
          window.location.replace(reactBaseURL + "/customerView");
        }, 2050);
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
              <h1 class="header-title">Update Customer</h1>
            </div>

            <div class="col-md-12">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="inputEmail4">Name</label>
                      <FormInput
                        value={customerData.name}
                        title="number"
                        onSave={nameSetHandler}
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="inputPassword4">Email</label>
                      <FormInput
                        value={customerData.email}
                        title="number"
                        onSave={emailSetHandler}
                      />
                    </div>
                  </div>

                  <div class="mb-3 ">
                    <label for="inputAddress">Address</label>
                    <FormInput
                      value={customerData.address}
                      title="number"
                      onSave={addressSetHandler}
                    />
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="inputCity">NIC</label>
                      <FormInput
                        value={customerData.nic}
                        title="number"
                        onSave={nicSetHandler}
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="inputCity">Contact No</label>
                      <FormInput
                        value={customerData.contactNo}
                        title="number"
                        onSave={phoneSetHandler}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    onClick={() => editMyCustomer(id)}
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
