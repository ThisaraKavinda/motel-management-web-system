import React, { useState, useEffect } from "react";

export default function FoodItemPopup(props) {

    const [item, setItem] = useState(props.item);
    const [isRegular, setIsRegular] = useState(false);
    const [isLarge, setIsLarge] = useState(false);
    const [isFamily, setIsFamily] = useState(false);
    const [isSpecial, setIsSpecial] = useState(false);

    useEffect(() => {
        setItem(props.item);
        if (!props.item.regularPrice == "")
            setIsRegular(true);
        if (!props.item.largePrice == "")
            setIsLarge(true);
        if (!props.item.familyPrice == "")
            setIsFamily(true);
        if (!props.item.specialPrice == "")
            setIsSpecial(true);
    }, [props.item])

    const closeOnClickHandler = () => {
        props.closeOnClickHandler();
    }

    const addItemToCart = (item, price) => {
        props.addItemToCart(item, price);
        props.closeOnClickHandler();
    }
    
    return (
        <div class="card border bg-light w-40 shadow" style={{position:'fixed', bottom:'10%', right:'25%', zIndex:1,  }}>
            <div class="row d-flex justify-content-end">
                <div class="col-1 mt-3 mx-4 d-flex justify-content-end">
                    <button type="button" class="btn-close" aria-label="Close" onClick={closeOnClickHandler}></button>
                </div>
            </div>
            <div class="row d-flex justify-content-center">
                <div class="col-10 my-2 mx-4" >
                    <img src={item.image} class="img-fluid img-thumbnail" style={{width: "500px"}}></img>
                </div>
            </div>
            <div class="row d-flex justify-content-center">
                <div class="col-auto my-2" >
                    <h5 class="fw-semibold monospace">{item.name} </h5>
                </div>
            </div>
            <div class="row d-flex justify-content-center">
                <div class="col-auto my-2" >
                    
                    {(isRegular) ? (<jsx>
                    <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" 
                    onClick={addItemToCart.bind(this, item, item.regularPrice)}/>
                    <label class="btn btn-light mx-2 px-3 border" for="option1">
                        <div class="row">
                            <h5 class="monospace mb-1">Regular</h5>
                        </div>
                        <div class="row">
                            <p class="mb-0 fw-6 monospace dw-semibold"> Rs. {item.regularPrice}</p>
                        </div>
                    </label></jsx>) : null }

                    {(isLarge) ? (<jsx>
                    <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off" 
                    onClick={addItemToCart.bind(this, item, item.largePrice)}/> 
                    <label class="btn btn-light mx-2 px-3 border" for="option2">
                        <div class="row">
                            <h5 class="monospace mb-1">Large</h5>
                        </div>
                        <div class="row">
                            <p class="mb-0 fw-6 monospace dw-semibold"> Rs. {item.largePrice}</p>
                        </div>
                    </label></jsx>) : null }

                    {(isFamily) ? (<jsx>
                    <input type="radio" class="btn-check" name="options" id="option3" autocomplete="off" 
                    onClick={addItemToCart.bind(this, item, item.familyPrice)} />
                    <label class="btn btn-light mx-2 px-3 border" for="option3">
                        <div class="row">
                            <h5 class="monospace mb-1">Family</h5>
                        </div>
                        <div class="row">
                            <p class="mb-0 fw-6 monospace dw-semibold"> Rs. {item.familyPrice}</p>
                        </div>
                    </label></jsx>) : null }

                    {(isSpecial) ? (<jsx>
                    <input type="radio" class="btn-check" name="options" id="option4" autocomplete="off" 
                    onClick={addItemToCart.bind(this, item, item.specialPrice)} />
                    <label class="btn btn-light mx-2 px-3 border" for="option4">
                        <div class="row">
                            <h5 class="monospace mb-1">Special</h5>
                        </div>
                        <div class="row">
                            <p class="mb-0 fw-6 monospace dw-semibold"> Rs. {item.specialPrice}</p>
                        </div>
                    </label></jsx>) : null }
                    

                </div>
            </div>
            <div class="row d-flex justify-content-start">
                <div class="col-auto mt-2 mb-4 mx-5" >
                    <p class="fw-semibold monospace mb-0">Category: {item.category} </p>
                </div>
            </div>
        </div>
    )
}