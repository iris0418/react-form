import React, { Component } from "react";

import Input from "./components/Input/Input";
import Button from "./components/Button/Button";

export default class App extends Component {
  state = {
    orderForm: {
      name: {
      
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
      
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      postcode: {
        
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postcode",
        },
        value: "",
        validation: {
          required: true,
          minLength: 4,
          maxLength: 4,
          isNumeric: true,
        },
        valid: false,
        touched: false,
      },
      country: {
      
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
    
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "fastest",
              displayValue: "Fastest",
            },
            {
              value: "cheapest",
              displayValue: "Cheapest",
            },
          ],
        },
        value: "",
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
  };
  orderHandler = (e) => {
    e.preventDefault();

    const formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    console.log(formData);
  };

  checkValidation(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.trim().length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      // isValid = pattern.test(value) && isValid;
      isValid = value.match(pattern) !== null && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      // isValid = pattern.test(value) && isValid;
      isValid = value.match(pattern) !== null && isValid;
    }

    return isValid;
  }

  valueChangedHandler = (e, id) => {
    let updatedForm = { ...this.state.orderForm };
    let updatedFormElement = { ...updatedForm[id] };
    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = this.checkValidation(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedForm[id] = updatedFormElement;

    //check whole form validation
    let formIsValid = true;
    for (let key in updatedForm) {
      formIsValid = formIsValid && updatedForm[key].valid;
    }

    this.setState({ orderForm: updatedForm, formIsValid: formIsValid });
  };

  render() {
    let formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = formElementsArray.map((el,i) => (
      <Input
        key={i}
        id={el.id}
        elementType={el.config.elementType}
        elementConfig={el.config.elementConfig}
        value={el.config.value}
        valid={el.config.valid}
        touched={el.config.touched}
        changed={(e) => this.valueChangedHandler(e, el.id)}
      ></Input>
    ));

    return (
      <div>
        <h1>My Forms</h1>
        <form>
          {form}
          <Button
            btnType="Success"
            disabled={!this.state.formIsValid}
            clicked={this.orderHandler}
          >
            Order
          </Button>
        </form>
      </div>
    );
  }
}
