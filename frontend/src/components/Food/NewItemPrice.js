import React, { useState, useEffect } from "react";

export default function NewItemPrice ({settingPrices}) {

    const [regularPrice, setRegularPrice] = useState('');

    const setRegularPriceHandler = (event) => {
        setRegularPrice(event.target.value);
        settingPrices(regularPrice, '', '', '', true, false, false, false);
    }

    return (
        <div>
            <div class="row px-4 mb-2">
                <div class="mb-3 col-md-12">
                    <p>Available Portions</p>
                    <input type="checkbox" class="btn-check" id="btn-check" autocomplete="off" checked={true}/>
                    <label class="btn btn-light mx-4" for="btn-check">Regular</label>
                </div>
            </div>

            <div class="row px-4 mb-2">
                <div class="mb-3 col-md-12">
                    <p>Prices</p>
                    <div class="row">
                        <label for="inputPassword" class="col-sm-1 col-form-label">Regular</label>
                        <div class="col-sm-2">
                        <input type="text" class="form-control" style={{marginRight:"100px"}}
                        onChange={setRegularPriceHandler}/>
                        </div>                     
                    </div>                    
                </div>
            </div>
        </div>
    )
}