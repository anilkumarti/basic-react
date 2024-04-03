import React from "react";

const Input=(props)=>
{
return (
    <div>
    <label htmlFor={props.id}>{props.Name}</label>
    <input
      type={props.type}
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
    />
  </div>
);
}
export default Input;