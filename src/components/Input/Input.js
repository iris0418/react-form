import React from "react";

import classes from './Input.module.scss';

 const Input = (props) => {
  let inputElement = null;
  let inputClasses =[classes.InputElement];
  let inputErrorMsg=null;
  
  if (props.touched){
    if (!props.valid) {
      inputClasses.push(classes.Invalid);
      inputErrorMsg = (
        <p className={classes.ValidationError}>
          please input a valid {props.elementConfig.type} value!
        </p>
      );
    }
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
        id={props.id}
        aria-label={props.id}
        aria-required="true"
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        ></input>
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
        id={props.id}
        aria-label={props.id}
        aria-required="true"
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        ></textarea>
      );
      break;
    case "select":
      inputElement = (
        <select
        id={props.id}
        aria-label={props.id}
        aria-required="true"
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((op) => (
            <option id={op.value} value={op.value} key={op.value}>
              {op.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
        id={props.id}
        aria-label={props.id}
        aria-required="true"
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        ></input>
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label} 
      htmlFor={props.id}
      >
        {props.elementConfig.placeholder?props.elementConfig.placeholder:"Delivery Method"}
      </label>
      {inputElement}
      {inputErrorMsg}
    </div>
  );
};

export default Input;