import React, { useEffect, useReducer, useState } from "react";

import classes from "./utils/Form.module.css";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const nameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 5 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 5 };
  }
  return { value: "", isValid: false };
};

const Form = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [infoSent, setInfoSent] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: nameIsValid } = nameState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && nameIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, nameIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const nameChangeHandler = (event) => {
    dispatchName({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchName({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setInfoSent(true);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            nameState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Nombre</label>
          <input
            type="text"
            id="name"
            value={nameState.value}
            onChange={nameChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        {(nameState.isValid === false || emailState.isValid === false) && (
          <p>Por favor verifique su información nuevamente</p>
        )}
        {infoSent && (
          <p>{`Gracias ${nameState.value} te contactaremos cuando antes vía mail`}</p>
        )}
        <div className={classes.actions}>
          <button type="submit" className={classes.btn} disabled={!formIsValid}>
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
