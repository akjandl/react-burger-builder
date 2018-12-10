import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
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
        validationMessage: 'Invalid password format',
        touched: false
      }
    },
    valid: false,
    isSignup: true
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath('/');
    }
  }

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
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return {isSignup: !prevState.isSignup}
    })
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = <Spinner />;
    if (!this.props.loading) {
      form = formElementsArray.map(elem => (
        <Input
          key={elem.id}
          elementType={elem.config.elementType}
          elementConfig={elem.config.elementConfig}
          value={elem.config.value}
          invalid={!elem.config.valid}
          shouldValidate={elem.config.validation}
          validationMessage={elem.config.validationMessage}
          touched={elem.config.touched}
          changed={(event) => this.inputChangedHandler(event, elem.id)}
        >
        </Input>
      ));
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>
    }

    if (this.props.isAuth) {
      return <Redirect to={this.props.authRedirectPath} />
    }

    return (
      <div className={classes.Auth}>
        <h2 style={{color: '#cc8955'}}>{this.state.isSignup ? 'SIGN UP' : 'SIGN IN'}</h2>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button
          btnType="Danger"
          clicked={this.switchAuthModeHandler}
        >SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}
        </Button>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirect,
    buildingBurger: state.burgerBuilder.building,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);