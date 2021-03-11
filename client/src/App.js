import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Protected from "./components/ProtectedRoute";
import TodoList from "./components/TodoList";
import { useSelector } from "react-redux";
import "./App.css";

const App = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Protected path="/" exact loggedIn={auth.logged} component={TodoList} />
        <Route path="/register" component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
