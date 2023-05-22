
import { CustomerModel } from '../models/customer.js';


export const addCustomer = async (req, res) => {
    console.log(req.body);
    const customer = new CustomerModel({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        nic: req.body.nic,
        contactNo: req.body.contactNo,
        state: req.body.state
    });
    const details = await customer.save();
    if (details) {
        res.send({
            status: true,
            details: details
        });
    } else {
        res.send({
            status: false,
        });
    }
}

export const getAllCustomers = async (req, res) => {
    const customers = await CustomerModel.find({});
    res.send(customers);
}

export const getAllCustomersCount = async (req, res) => {
    const customers = await CustomerModel.find().count();
    res.send(String(customers));
}


export const deleteCustomer = async (req, res) => {
    const customer = await CustomerModel.findOneAndDelete({ _id: req.body.id });
    res.send(customer);
}

export const editCustomer = async (req, res) => {
    try {
        console.log(req);
        const customer = await CustomerModel.findOneAndUpdate(
            {
                _id: req.body._id
            },
            {
                _id: req.body._id,
                name: req.body.name,
                email: req.body.email,
                address: req.body.address,
                nic: req.body.nic,
                contactNo: req.body.contactNo
            },
            {
                new:true
            }
            );

        if (customer) {
            res.send({
                status: true,
                details: customer  
            });
        } else {
            res.send({
                status: false,
            });
        }

    } catch (error) {
        console.log(error.messaga)
    }
}



export const getSelectedCustomer = async (req, res) => {
    const customer = await CustomerModel.findOne({ _id: req.body.id });
    res.send(customer);
}

export const getSelectedCustomerByNic = async (req, res) => {
    const nic = req.params.nic;
    const customer = await CustomerModel.findOne({ nic: nic });
    res.send(customer);
}


export const logIn = async (req, res) => {
    const customer = await CustomerModel.findOne({ email: req.body.email, nic: req.body.nic });
    if (customer) {
        res.send({
            status: true,
            details: customer  
        });
    } else {
        res.send({
            status: false,
        });
    }
}