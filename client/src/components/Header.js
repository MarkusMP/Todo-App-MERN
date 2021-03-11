import React from "react";
import { Navbar, Form, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const logged = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch({
      type: "SIGN_OUT",
    });
  };

  return (
    <Navbar className="bg-light justify-content-between">
      <Nav className="mr-auto">
        <Link to="/">
          <h3>Dashboard</h3>
        </Link>
      </Nav>
      <Form inline>
        {logged.userId === "" ? (
          <>
            <Link to="/login" className="mr-1 btn btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
          </>
        ) : (
          <Button variant="primary" onClick={signOutHandler}>
            Logout
          </Button>
        )}
      </Form>
    </Navbar>
  );
};

export default Header;
