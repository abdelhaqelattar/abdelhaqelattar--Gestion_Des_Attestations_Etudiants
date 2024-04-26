import { useContext } from "react";

import { useHttpClient } from "../../Shared/Hooks/HttpHook";
import { AuthContext } from "../../Shared/Context/AuthContext";
import { useForm } from "../../Shared/Hooks/FormHook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../Shared/Util/Validators";

import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import classes from "./style.module.css";

const Login = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    clearError();
    try {
      const responseData = await sendRequest(
        "http://127.0.0.1:5000/auth/login",
        "POST",
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      auth.login(responseData.userId, responseData.token);
    } catch (err) {}
  };

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  return (
    <form onSubmit={authSubmitHandler}>
      {error}
      <Input
        className={classes.formControl}
        element="input"
        id="email"
        type="email"
        label="EMAIL ADDRESS"
        placeholder="name@example.com"
        validators={[VALIDATOR_EMAIL()]}
        errorText="Please enter a valid email address."
        onInput={inputHandler}
      />
      <Input
        className={classes.formControl}
        element="input"
        id="password"
        type="password"
        label="PASSWORD"
        placeholder="Password"
        validators={[VALIDATOR_MINLENGTH(6)]}
        errorText="Please enter a valid password, at least 6 characters."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid} fullWidth>
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default Login;
