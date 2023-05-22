
import { EmployeeModel } from '../models/employee.js';


export const addEmployee = async (req, res) => {
    console.log(req.body);
    const employee = new EmployeeModel({
        name: req.body.name,
        address: req.body.address,
        dob: req.body.dob,
        gender: req.body.gender,
        email: req.body.email,
        nic: req.body.nic,
        contact: req.body.contact,
        password: req.body.password,
        Type:req.body.Type,
        leaveTaken:req.body.leaveTaken,
        salary:req.body.salary

    });
    const details = await employee.save();
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

export const getAllEmployees = async (req, res) => {
    const employees = await EmployeeModel.find({});
    res.send(employees);
}

export const getAllEmployeesCount = async (req, res) => {
    const employees = await EmployeeModel.find().count();
    res.send(String(employees));
}

export const getAllChefCount = async(req,res) =>{
    const employees = await EmployeeModel.find({Type:"cf"}).count();
    res.send(String(employees));
}

export const getAllKetchenHCount = async(req,res) =>{
    const employees = await EmployeeModel.find({Type:"kh"}).count();
    res.send(String(employees));
}

export const getAllWaitersCount = async(req,res) =>{
    const employees = await EmployeeModel.find({Type:"wt"}).count();
    res.send(String(employees));
}

export const getAllReceptionistsCount = async(req,res) =>{
    const employees = await EmployeeModel.find({Type:"rt"}).count();
    res.send(String(employees));
}

export const getAllOfficeSCount = async(req,res) =>{
    const employees = await EmployeeModel.find({Type:"os"}).count();
    res.send(String(employees));
}

export const getAllVehicleEmployeeCount = async(req,res) =>{
    const employees = await EmployeeModel.find({Type:"dr"}).count();
    res.send(String(employees));
}

export const getAllContractBaseCount = async(req,res) =>{
    const employees = await EmployeeModel.find({Type:"cb"}).count();
    res.send(String(employees));
}

export const deleteEmployee = async (req, res) => {
    const employee = await EmployeeModel.findOneAndDelete({ _id: req.body.id });
    res.send(employee);
}

export const editEmployee = async (req, res) => {
    try {
        console.log(req);
        const employee = await EmployeeModel.findOneAndUpdate(
            {
                _id: req.body._id
            },
            {
                _id: req.body._id,
                name: req.body.name,
                address: req.body.address,
                dob: req.body.dob,
                gender: req.body.gender,
                email: req.body.email,
                nic: req.body.nic,
                contact: req.body.contact,
                password: req.body.password,
                Type:req.body.Type,
                leaveTaken:req.body.leaveTaken,
                salary:req.body.salary
            },
            {
                new:true
            }
            );

        if (employee) {
            res.send({
                status: true,
                details: vehicle  
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



export const getSelectedEmployee = async (req, res) => {
    const employee = await EmployeeModel.findOne({ _id: req.body.id });
    res.send(employee);
}

export const getDrivers = async(req,res) => {
    const employee = await EmployeeModel.find({Type:"dr"})
    res.send(employee);
}

export const logIn = async (req, res) => {
    const employee = await EmployeeModel.findOne({ Type: req.body.Type, email: req.body.email, password: req.body.password });
    if (employee) {
        res.send({
            status: true,
            details: employee  
        });
    } else {
        res.send({
            status: false,
        });
    }
}

export const getAllEmployeesType = async (req, res) => {
    const type = req.params.type;
    const employees = await EmployeeModel.find({Type: type});
    res.send(employees);
}