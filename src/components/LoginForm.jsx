import React, { useState, useEffect } from "react";
import { Form, Input, Container } from "semantic-ui-react";
import { auth } from "../modules/auth";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const signupMessage = useSelector((state) => state.messages.signupMessage);
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "RESET_ACTIVE_PAGE" });
  }, [dispatch]);

  const login = async (e) => {
    try {
      const response = await auth.signIn(
        e.target.email.value,
        e.target.password.value
      );
      if (response.success) {
        dispatch({
          type: "SET_AUTHENTICATED",
          payload: {
            authenticated: response.success,
            uid: response.data.uid,
          },
        });
        dispatch({
          type: "GET_KARMA",
          payload: {
            karma: response.data.karma_points,
          },
        });
        history.push("/");
      }
    } catch (error) {
      setErrorMessage(error.response.data.errors[0]);
    }
  };

  const signUp_message =
  signupMessage === "" ? (
    <h3>
      Don't have an account?
      <br></br>
      <Link id="signup" name="Signup" to={{ pathname: "/signup" }}>
        Click here to sign up
      </Link>
    </h3>
  ) : (
    <h3 id="signedup">Signed up sucessfully!</h3>
  );

  return (
    <div id="page-container">
      <Container className="form-container">
        <Form id="login-form" onSubmit={login}>
          <h1 className="input-labels">{"Log in"}</h1>
          <h4 className="input-labels">{"Email"}</h4>
          <Form.Input name="email" type="email" id="email"></Form.Input>
          <h4 className="input-labels">{"Password"}</h4>
          <Form.Input
            name="password"
            type="password"
            id="password"
          ></Form.Input>
          <Input type="submit" value="Submit" id="submit-btn" />
          <h3 className="input-labels" id="error-message">
          {errorMessage}<br/>
          {signUp_message}
        </h3>
        </Form>
      </Container>
    </div>
  );
  };

export default LoginForm;
