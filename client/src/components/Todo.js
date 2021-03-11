import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

const Todo = ({ data, id, fetchTodos, jwt, key }) => {
  const deleteTodoHandler = async () => {
    try {
      await axios.delete(`http://localhost:5000/todos/delete`, {
        headers: {
          "auth-token": jwt,
        },

        data: {
          id: id,
          todoid: data.id,
        },
      });
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const editTodoHandler = async () => {
    const editTodo = prompt("Rename the todo:", data.title);

    if (editTodo === null || editTodo === "") return;
    try {
      await axios.put(
        "http://localhost:5000/todos/update",
        {
          todoid: data.id,
          title: editTodo,
        },
        {
          headers: {
            "auth-token": jwt,
          },
        }
      );
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
    console.log(editTodo);
  };

  return (
    <tr>
      <td>
        <span>{data.title}</span>
        <div>
          <Button variant="warning" className="mr-2" onClick={editTodoHandler}>
            Edit
          </Button>
          <Button variant="danger" onClick={deleteTodoHandler}>
            X
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default Todo;
