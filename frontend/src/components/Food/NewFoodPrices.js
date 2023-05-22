import React, { useState, useEffect } from "react";

export default function NewFoodPrices ({settingPrices}) {

    const [regularPrice, setRegularPrice] = useState('');
    const [largePrice, setLargePrice] = useState('');
    const [familyPrice, setFamilyPrice] = useState('');
    const [specialPrice, setSpecialPrice] = useState('');

    const [isRegular, setIsRegular] = useState(true);
    const [isLarge, setIsLarge] = useState(false);
    const [isFamily, setIsFamily] = useState(false);
    const [isSpecial, setIsSpecial] = useState(false);

    const setRegularPriceHandler = (event) => {
        setRegularPrice(event.target.value);
        settingPrices(regularPrice, largePrice, familyPrice, specialPrice, isRegular, isLarge, isFamily, isSpecial);
    }

    const setLargePriceHandler = (event) => {
        setLargePrice(event.target.value);
        settingPrices(regularPrice, largePrice, familyPrice, specialPrice, isRegular, isLarge, isFamily, isSpecial);
    }

    const setFamilyPriceHandler = (event) => {
        setFamilyPrice(event.target.value);
        settingPrices(regularPrice, largePrice, familyPrice, specialPrice, isRegular, isLarge, isFamily, isSpecial);
    }

    const setSpecialPriceHandler = (event) => {
        setSpecialPrice(event.target.value);
        settingPrices(regularPrice, largePrice, familyPrice, specialPrice, isRegular, isLarge, isFamily, isSpecial);
    }

    const setIsRegularHandler = (e) => {
        setIsRegular(e.target.checked);
        settingPrices(regularPrice, largePrice, familyPrice, specialPrice, isRegular, isLarge, isFamily, isSpecial);
    }

    const setIsLargeHandler = (e) => {
        setIsLarge(e.target.checked);
        settingPrices(regularPrice, largePrice, familyPrice, specialPrice, isRegular, isLarge, isFamily, isSpecial);
    }

    const setIsFamilyHandler = (e) => {
        setIsFamily(e.target.checked);
        settingPrices(regularPrice, largePrice, familyPrice, specialPrice, isRegular, isLarge, isFamily, isSpecial);
    }

    const setIsSpecialHandler = (e) => {
        setIsSpecial(e.target.checked);
        settingPrices(regularPrice, largePrice, familyPrice, specialPrice, isRegular, isLarge, isFamily, isSpecial);
    }

    return (
        <div>
            <div class="row px-4 mb-2">
                <div class="mb-3 col-md-12">
                    <p>Available Portions</p>
                    <input type="checkbox" class="btn-check" id="btn-check" autocomplete="off"
                    onChange={setIsRegularHandler} defaultChecked={true}/>
                    <label class="btn btn-light mx-4" for="btn-check">Regular</label>

                    <input type="checkbox" class="btn-check" id="btn-check2" autocomplete="off"
                    onChange={setIsLargeHandler} />
                    <label class="btn btn-light mx-4" for="btn-check2">Large</label>

                    <input type="checkbox" class="btn-check" id="btn-check3" autocomplete="off" 
                    onChange={setIsFamilyHandler} />
                    <label class="btn btn-light mx-4" for="btn-check3">Family</label>

                    <input type="checkbox" class="btn-check" id="btn-check4" autocomplete="off" 
                    onChange={setIsSpecialHandler}/>
                    <label class="btn btn-light mx-4" for="btn-check4">Special</label>
                </div>
            </div>

            <div class="row px-4 mb-2">
                <div class="mb-3 col-md-12">
                    <p>Prices</p>
                    <div class="row">
                        <label for="inputPassword" class="col-sm-1 col-form-label">Regular</label>
                        <div class="col-sm-2">
                        <input type="text" class="form-control" style={{marginRight:"100px"}} disabled={!isRegular} 
                        onChange={setRegularPriceHandler}/>
                        </div>
                        <label for="inputPassword" class="col-sm-1 col-form-label" style={{marginLeft:"100px"}}>Large</label>
                        <div class="col-sm-2">
                        <input type="text" class="form-control" disabled={!isLarge} 
                        onChange={setLargePriceHandler}/>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <label for="inputPassword" class="col-sm-1 col-form-label">Family</label>
                        <div class="col-sm-2">
                        <input type="text" class="form-control" style={{marginRight:"100px"}} disabled={!isFamily} 
                        onChange={setFamilyPriceHandler}/>
                        </div>
                        <label for="inputPassword" class="col-sm-1 col-form-label" style={{marginLeft:"100px"}}>Special</label>
                        <div class="col-sm-2">
                        <input type="text" class="form-control" disabled={!isSpecial} 
                        onChange={setSpecialPriceHandler}/>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}