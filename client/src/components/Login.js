import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const login = await axios.post("/login", {
        email,
        password,
      });
      dispatch({
        type: "FETCH_DATA",
        payload: login.data,
      });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <h2>Login</h2>
      <Form onSubmit={loginHandler}>
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
        <Button variant="success" type="submit" onSubmit={loginHandler}>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
