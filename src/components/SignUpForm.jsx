import React, { useEffect } from "react";
import { Form, Input, Container } from "semantic-ui-react";
import { auth } from "../modules/auth";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const SignUpForm = () => {
  const signupMessage = useSelector(state => state.messages.signupMessage);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "RESET_ACTIVE_PAGE" });
  }, [dispatch]);

  const signup = async (e) => {
    try {
      const response = await auth.signUp({
        email: e.target.email.value,
        password: e.target.password.value,
        password_confirmation: e.target.passwordConfirmation.value,
      });
      if (response.data.status === "success") {
        history.replace("/login");
        dispatch({
          type: "SET_SIGNUP_MESSAGE",
          payload: { signupMessage: response.data.message },
        });
      }
    } catch (error) {
      dispatch({
        type: "SET_SIGNUP_MESSAGE",
        payload: { signupMessage: error.response.data.errors.full_messages },
      });
    }
  };

  return (
    <div id="page-container">
      <Container className="form-container">
        <Form id="signup-form" onSubmit={signup}>
          <h1 className="input-labels">{"Sign Up"}</h1>
          <h4 className="input-labels">{"Email"}</h4>
          <Form.Input name="email" type="email" id="email"></Form.Input>
          <h4 className="input-labels">{"Password"}</h4>
          <Form.Input
            name="password"
            type="password"
            id="password"
          ></Form.Input>
          <h4 className="input-labels">{"Password Confirmation"}</h4>
          <Form.Input
            name="passwordConfirmation"
            type="password"
            id="passwordConfirmation"
          ></Form.Input>
          <Input type="submit" value="Submit" id="submit-btn" />
          <h3 className="input-labels" id="error-message">
          {signupMessage}
        </h3>
        </Form>
      </Container>
    </div>
  );
};
export default SignUpForm;
