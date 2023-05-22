import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/C_M_Navbar';
import swal from 'sweetalert';

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
import { getAllCustomers, deleteCustomer } from '../controllers/customer';


export default function C_M_CustomerView() {

    const [customerList, setCustomerList] = useState([]);

    useEffect(() => {
        getAllCustomers().then((result) => {
            setCustomerList(result);
            //initialize datatable
            $(document).ready(function () {
                $('#example').DataTable();
            });
        });
    }, [])


    function deleteMyCustomer(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    deleteCustomer(id).then((result) => {
                        var customer = customerList.filter((e) => e._id !== result._id);
                        setCustomerList(customer);
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




    return (

        <div class="wrapper">
            <Navbar />
            <div class="main">


                <main class="content">
                    <div class="container-fluid">

                        <div class="header">
                            <h1 class="header-title">
                                View Customers
                            </h1>

                        </div>


                        <div class="col-12">
                            <div class="card">

                                <div class="card-body">

                                    <table id="example" class="table table-striped my">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Address</th>
                                                <th>NIC</th>
                                                <th>Contact No</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {customerList.map((value, index) => {
                                                return <tr key={index}>
                                                    <td>{value.name}</td>
                                                    <td>{value.email}</td>
                                                    <td>{value.address}</td>
                                                    <td>{value.nic}</td>
                                                    <td>{value.contactNo}</td>
                                                    <td class="table-action">

                                                        <button class="btn btn-pill btn-danger btn-sm" style={{ marginLeft: 45, width: 60 }} onClick={() => deleteMyCustomer(value._id)}>Delete</button>
                                                        <Link to={"/customerEdit/" + value._id} class="top-bar-link"><button class="btn btn-pill btn-success btn-sm" style={{ marginLeft: 10, width: 60 }}>Edit</button></Link>

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







