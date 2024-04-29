import React, { useEffect, useState } from "react";
import Form from "./Form";
import { DELETE_TODO_MUTATION } from "../GraphQL/Mutations";
import { useQuery, useMutation } from "@apollo/client";
import { LOAD_TODOS } from "../GraphQL/Queries";
import './index.css';

function GetTodos() {
  const { data, loading, refetch } = useQuery(LOAD_TODOS);
  const [deleteTodo, { data: successResponse, deleteLoading, error }] = useMutation(DELETE_TODO_MUTATION);
  const [todos, setTodos] = useState([]);

  const deleteTodoAction = (id) => {
    deleteTodo({
      variables: {
        id: id,
      },
    });
    
  };

  useEffect(() => {
    if (successResponse?.deleteTodo?.id) {
      refetch();
      console.log('Todo is deleted successfully!!!');
    } else if (error) {
      console.log('Error: ' + error);
    }
  }, [successResponse, error, refetch]);

  useEffect(() => {
    if (data) {
      setTodos(data.getAllTodos);
    }
  }, [data]);

  return (
    <div>
      <Form refetch={refetch} />
      <label>Todo List:</label>
      <div className="list-collection">
        {loading && <div class="loader"></div>}
        {todos.map((val) => {
          return (
            <div key={val.id} className="list-items">
              <li> {val.todoContent}</li>
              <button className="delete-btn" onClick={() => deleteTodoAction(val.id)}> Delete</button>
              {deleteLoading && <div class="loader"></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GetTodos;
