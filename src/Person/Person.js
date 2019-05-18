import React from 'react'
import './Person.css'

const person = (props) => {
    return (
        <div className="Person">
             <p id="para1" onClick={props.click}> I'm {props.name} and I am {props.age} years old!</p>
             <p id="para2" >{props.children}</p>
             <input id="inputName" type = "text" onChange = {props.changeName} value={props.name}/>
        </div>
       
    )
};

export default person;