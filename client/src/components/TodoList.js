import React, { useEffect, useState, useCallback } from "react";
import { Card, InputGroup, Button, FormControl, Table } from "react-bootstrap";
import Todo from "./Todo";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const TodoList = () => {
  const [title, setTitle] = useState("");
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const fetchTodos = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/todos/${state.auth.userId}`, {
        headers: {
          "auth-token": state.auth.jwt,
        },
      });
      dispatch({
        type: "FETCH_TODOS",
        payload: data.todos,
      });
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, state.auth.jwt, state.auth.userId]);

  const createTodoHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/todos/create",
        {
          id: state.auth.userId,
          todo: { title: title },
        },
        {
          headers: {
            "auth-token": state.auth.jwt,
          },
        }
      );
      fetchTodos();
      setTitle("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const todos = state.todos.todos.map((todo) => (
    <Todo
      key={todo.id}
      data={todo}
      fetchTodos={fetchTodos}
      id={state.auth.userId}
      jwt={state.auth.jwt}
    />
  ));
  return (
    <div className="card-container">
      <Card style={{ width: "50%" }}>
        <Card.Header>Todos ({state.todos.todos.length})</Card.Header>
        <Card.Body>
          <form onSubmit={createTodoHandler}>
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter todo here"
                required
              />
              <InputGroup.Append>
                <Button type="submit" onSubmit={createTodoHandler}>
                  Submit
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </form>
          <Table striped>
            <tbody>{todos}</tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TodoList;
