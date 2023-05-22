import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';


import Login from './view/Login';


//Hiru
import C_M_Dashboard from './view/C_M_Dashboard';
import C_M_CustomerAdd from './view/C_M_CustomerAdd';
import C_M_CustomerView from './view/C_M_CustomerView';
import C_M_CustomerEdit from './view/C_M_CustomerEdit';
import C_M_AppointmentAdd from './view/C_M_AppointmentAdd';
import C_M_AppointmentView from './view/C_M_AppointmentView';
import C_M_AppointmentEdit from './view/C_M_AppointmentEdit';
import C_M_VehicleBookingAdd from './view/C_M_VehicleBookingAdd';
import C_M_VehicleBookingView from './view/C_M_VehicleBookingView';
import C_M_VehicleBookingEdit from './view/C_M_VehicleBookingEdit';
import C_M_Report from './view/C_M_Report';
import CustomerLogin from './view/CustomerLogin';
import CustomerBill from './view/CustomerBill';
import Test from './view/test';

//Thanu
import E_M_Dashboard from './view/E_M_Dashboard';
import E_M_Registration from './view/E_M_Registration';
import E_M_ManageEmployee from './view/E_M_ManageEmployee';
import E_M_UpdateEmployee from './view/E_M_UpdateEmployee';
import E_M_ViewEmployee from './view/E_M_ViewEmployee';
import E_M_EditEmployee from './view/E_M_EditEmployee';
import E_M_ManageLeaves from './view/E_M_ManageLeaves';
import E_M_ManageSalary from './view/E_M_ManageSalary';
import E_M_Report from './view/E_M_Report';


//Sheha
import V_M_Dashboard from './view/V_M_Dashboard';
import V_M_VehicleAdd from './view/V_M_VehicleAdd';
import V_M_VehicleList from './view/V_M_VehicleList';
import V_M_VehicleEdit from "./view/V_M_VehicleEdit";
import V_M_VehicleCustomerRequest from "./view/V_M_VehicleCustomerRequest";
import V_M_VehicleCustomerRequestActive from "./view/V_M_VehicleCustomerRequestActive";
import V_M_VehicleCustomerRequestCompleted from "./view/V_M_VehicleCustomerRequestCompleted";
import V_M_VehicleReport from "./view/V_M_Report";

//Niakalo
import F_M_Dashoard from './view/Food/F_M_Dashboard';
import F_M_FoodSelect from './view/Food/F_M_SelectFood';
import F_M_RoomSelect from './view/Food/F_M_SelectRoom';
import F_M_AddNewItem from './view/Food/F_M_AddNewItem';
import F_M_FoodItemList from './view/Food/F_M_FoodItemList';
import F_M_Report from './view/Food/F_M_Report';
import F_M_OrderPlaced from './view/Food/F_M_OrderPlaced';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Login/>} />
      
        <Route exact path="/customerDashboard" element={<C_M_Dashboard />} />
        <Route exact path="/customerAdd" element={<C_M_CustomerAdd />} />
        <Route exact path="/customerView" element={<C_M_CustomerView />} />
        <Route exact path="/customerEdit/:id" element={<C_M_CustomerEdit />} />
        <Route exact path="/appointmentAdd" element={<C_M_AppointmentAdd />} />
        <Route exact path="/appointmentView" element={<C_M_AppointmentView />}/>
        <Route exact path="/appointmentEdit/:id" element={<C_M_AppointmentEdit />}/>
        <Route exact path="/vehicleBookingAdd" element={<C_M_VehicleBookingAdd />}/>
        <Route exact path="/vehicleBookingView" element={<C_M_VehicleBookingView />}/>
        <Route exact path="/vehicleBookingEdit/:id" element={<C_M_VehicleBookingEdit />}/>
        <Route exact path="/customerReport" element={<C_M_Report />}/>
        <Route exact path="/customerLogin" element={<CustomerLogin />}/>
        <Route exact path="/CustomerBill" element={<CustomerBill />}/>
        <Route exact path="/test" element={<Test />} />
        
        <Route exact path="/employeeDashboard" element={<E_M_Dashboard />} />
        <Route exact path="/registration" element={<E_M_Registration />} />
        <Route exact path="/updateEmployee" element={<E_M_UpdateEmployee />} />
        <Route exact path="/manageEmployee" element={<E_M_ManageEmployee />} />
        <Route exact path="/employeeEdit/:id" element={<E_M_EditEmployee />} />
        <Route exact path="/employeeView/:id" element={<E_M_ViewEmployee />} />
        <Route exact path="/employeeReport" element={<E_M_Report />} />
        
        <Route exact path="/vehicleDashboard" element={<V_M_Dashboard />} />
        <Route exact path="/vehicleAdd" element={<V_M_VehicleAdd />} />
        <Route exact path="/vihicleList" element={<V_M_VehicleList />} />
        <Route exact path="/vehicleEdit/:id" element={<V_M_VehicleEdit />} />
        <Route exact path="/vehicle-customer-request" element={<V_M_VehicleCustomerRequest />} />
        <Route exact path="/vehicle-customer-request-Active" element={<V_M_VehicleCustomerRequestActive />} />
        <Route exact path="/vehicle-customer-request-Completed" element={<V_M_VehicleCustomerRequestCompleted />} />
        <Route exact path="/vehicleReport" element={<V_M_VehicleReport />} />

        <Route exact path="/foodDashboard" element={<F_M_Dashoard/>} />
        <Route exact path="/foodSelect" element={<F_M_FoodSelect/>} />
        <Route exact path="/foodSelect/:id" element={<F_M_FoodSelect/>} />
        <Route exact path="/roomSelect" element={<F_M_RoomSelect/>} />
        <Route exact path="/addNewItem" element={<F_M_AddNewItem/>} />
        <Route exact path="/foodItemList" element={<F_M_FoodItemList/>} />
        <Route exact path="/foodPaymentReport" element={<F_M_Report/>} />
        <Route exact path="/orderPlaced/:id" element={<F_M_OrderPlaced/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
