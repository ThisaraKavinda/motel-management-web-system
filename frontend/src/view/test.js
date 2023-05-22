import React, { useState, useEffect } from 'react';
import Navbar from '../components/C_M_Navbar';
import swal from 'sweetalert';

import Multiselect from 'multiselect-react-dropdown';
import Select from 'react-select'

//css
import '../css/modern.css';

//js
import '../js/app.js';


import {  getRooms } from '../controllers/room';


export default function Gg() {

    const [roomList, setRoomList] = useState([]);
    const [room, setRoom] = useState([]);

    console.log("+++++++++++++++++++++++++++++++++")
    console.log(room.length)
    console.log("+++++++++++++++++++++++++++++++++")


    useEffect(() => {
        getRooms().then((result) => {
            var list = result.map((data) => {
                return { value: data._id, label: data.name + " Room" };
            })
            setRoomList(list);
        });

    }, [])


    return (

       <div>
  <Select   isMulti options={roomList}  onChange={setRoom} />
       </div>
      

    )

}

