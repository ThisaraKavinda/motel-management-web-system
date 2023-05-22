import {useState, useEffect} from 'react';

const FormInput = (props) => {

    const name = props.value;

    const [input, setInput] = useState(name)

    const inputChangeHandler = (event) => {
        setInput(event.target.value);
        props.onSave(event.target.value);
    }

    useEffect(() => { 
        setInput(props.value);
    }, [props.value] )


    return (
       
            <input type="number" class="form-control text-center" min={1} max={50} value={input} onChange={inputChangeHandler} />
       
    )
}

export default FormInput;