import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';


class Auth extends Component {

  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    valid: false
  };

  inputChangedHandler = (event, inputKey) => {

    // const updatedControls = {...this.state.controls};
    // const updatedFormElem = {...updatedControls[inputKey]};
    // updatedFormElem.touched = true;
    // updatedFormElem.value = event.target.value;
    // updatedFormElem.valid = this.checkValidity(
    //   updatedFormElem.value, updatedFormElem.validation
    // );
    // updatedControls[inputKey] = updatedFormElem;
    // // validate entire form
    // let formIsValid = true;
    // for (let inputKey in updatedControls) {
    //   formIsValid = updatedControls[inputKey].valid && formIsValid;
    // }
    // this.setState({controls: updatedControls, valid: formIsValid})

    const updatedControls = {
      ...this.state.controls,
      [inputKey]: {
        ...this.state.controls[inputKey],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value, this.state.controls[inputKey].validation),
        touched: true
      }
    };
    this.setState({controls: updatedControls});
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.trim().length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value, this.state.controls.password.value);
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    const form = formElementsArray.map(elem => (
      <Input
        key={elem.id}
        elementType={elem.config.elementType}
        elementConfig={elem.config.elementConfig}
        value={elem.config.value}
        invalid={!elem.config.valid}
        shouldValidate={elem.config.validation}
        touched={elem.touched}
        changed={(event) => this.inputChangedHandler(event, elem.id)}
      >
      </Input>
    ));
    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    auth: state.authReducer.auth
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  }
};

export default connect(null, mapDispatchToProps)(Auth);