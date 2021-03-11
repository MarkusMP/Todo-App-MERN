import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const register = await axios.post(
        "/api/register",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "FETCH_DATA",
        payload: register.data,
      });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <h2>Register</h2>
      <Form onSubmit={registerHandler}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="success" type="submit" onSubmit={registerHandler}>
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;
