import React, { useEffect, useState } from "react";
import { CREATE_TODO_MUTATION } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import './index.css';

function Form({refetch}) {
  const [todoContent, setTodoContent] = useState('');

  const [createTodo, { data: successResponse, loading, error }] = useMutation(CREATE_TODO_MUTATION);

  const addTodo = () => {
    createTodo({
      variables: {
        todoContent: todoContent,
      },
    });
  };

  useEffect(() => {
    if (successResponse?.createTodo?.id) {
      refetch();
      setTodoContent('');
      console.log('A new todo is added successfully!!!');
    } else if (error) {
      console.log('Error: ' + error);
    }
  }, [successResponse, error, refetch]);

  return (
    <div>
      <label>Create a Todo:</label>
      <div className="todo-form">
        <input
          type="text"
          placeholder="Todo Content"
          value={todoContent}
          onChange={(e) => {
            setTodoContent(e.target.value);
          }}
        />
        <button className="create-btn" onClick={addTodo}> Create </button>
        {loading && <div class="loader"></div>}
      </div>
      <hr/>
    </div>
  );
}

export default Form;
