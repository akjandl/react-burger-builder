import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        validationMessage: 'Zip code must be at least 5 characters',
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ],
          type: 'text',
          placeholder: ''
        },
        value: 'cheapest',
        validation: {},
        valid: true
      },
    },
    loading: false,
    formIsValid: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const formData = {};
    for (let formElem of Object.entries(this.state.orderForm)) {
      formData[formElem[0]] = formElem[1].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    };
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false});
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({loading: false});
      });
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

  inputChangedHandler = (event, inputKey) => {
    const updatedOrderForm = {...this.state.orderForm};
    const updatedFormElem = {...updatedOrderForm[inputKey]};
    updatedFormElem.touched = true;
    updatedFormElem.value = event.target.value;
    updatedFormElem.valid = this.checkValidity(
      updatedFormElem.value, updatedFormElem.validation
    );
    updatedOrderForm[inputKey] = updatedFormElem;
    // validate form
    let formIsValid = true;
    for (let inputKey in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputKey].valid && formIsValid;
    }

    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  };

  render() {
   const formElementsArray = [];
   for (let key in this.state.orderForm) {
     formElementsArray.push({
       id: key,
       config: this.state.orderForm[key]
     });
   }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElem => (
          <Input
            key={formElem.id}
            elementType={formElem.config.elementType}
            elementConfig={formElem.config.elementConfig}
            value={formElem.config.value}
            changed={(event) => this.inputChangedHandler(event, formElem.id)}
            shouldValidate={formElem.config.validation}
            invalid={!formElem.config.valid}
            validationMessage={formElem.config.validationMessage}
            touched={formElem.config.touched}
          />
        ))}
        <Button
          className={classes.Input}
          btnType="Success"
          disabled={!this.state.formIsValid}
        >ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
};

export default connect(mapStateToProps, null)(ContactData);
