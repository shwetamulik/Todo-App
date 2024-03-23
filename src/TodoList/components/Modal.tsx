import { useState } from "react";
import classes from "../TodoList.module.css";
import { useCreateTodo } from "../custom-hooks/useCreateTodo";
import axios from "axios";
// import { useFetch } from "../custom-hooks/useFetch";



export const Modal = ({ isModalOpened, toggleModal, mode, setTodo, todoToEdit }) => {
  console.log('todoToEdit', todoToEdit)
 
  // const { updatedTodoListData } = useFetch();
  const [newTodo, setNewTodo] = useState({
    name: "",
    isCompleted: false,
    type: "",
  });

  const [editTodo, setEditTodo] = useState({})
  // const { postRequest, response } = useCreateTodo();

  const types = [
    { label: "Health", value: "health" },
    { label: "Work", value: "work" },
    { label: "Diet", value: "diet" },
  ];
  const handleInput = (e) => {
    setNewTodo({
      ...newTodo,
      name: e.target.value,
    });
  };
  const onSubmit = async () => {
    let res = await createTodos(newTodo);
    console.log('res', res)
    // await postRequest(newTodo);

    // await updatedTodoListData(newTodo);
    // setNewTodo({
    //   name: "",
    //   type: "",
    //   isCompleted: false,
    // });
    toggleModal(!isModalOpened);
  };
  const createTodos = (payload) => {
    axios.post('http://localhost:3000/todos', payload).then(res => setTodo((prev) => [...prev, payload])).then(res => console.log(res))
   }
  const updateTodo = () => {}
  const selectType = (e) => {
    setNewTodo({
      ...newTodo,
      type: e.target.value,
    });
  };
  return (
    <div className={classes.modal}>
      <h3>{mode === 'edit' ? 'Update Todo' : 'Create Todo'}</h3>
      <input
        type="text"
        placeholder="Enter Task"
        onChange={handleInput}
        value={newTodo.name}
        style={{ margin: "16px" }}
      />
      <select onChange={selectType} style={{ margin: "16px" }}>
        {types.map((type, i) => (
          <option value={type.value} key={i}>
            {type.label}
          </option>
        ))}
      </select>
      <button onClick={onSubmit}>Add</button>
    </div>
  );
};
