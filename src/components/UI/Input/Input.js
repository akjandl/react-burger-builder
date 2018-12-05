import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
          {...props.elementConfig} />
      );
      break;
    case ('textarea'):
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
          {...props.elementConfig} />
      );
      break;
    case ('select'):
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(opt => (
            <option
              key={opt.value}
              value={opt.value}
            >{opt.displayValue}</option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
          {...props.elementConfig} />
      );
      break;
  }

  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = (
      <p className={classes.ValidationMessage}>{props.validationMessage}</p>
    );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default input;