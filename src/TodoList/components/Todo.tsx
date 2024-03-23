import {  useEffect, useState } from "react";
import classes from "../TodoList.module.css";
import { GoPencil } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { useDeleteTodo } from "../custom-hooks/useDeleteTodo";
import { useUpdateTodo } from "../custom-hooks/useUpdateTodo";
import axios from "axios";



export default function Todo({
  todo,
  parentFunction,
  statusModified,
  isModalOpened, 
  toggleModal,
  mode,
  setMode,
  setTodo,
  openModal
}) {
  const [status, setStatus] = useState(statusModified);
  const [editTodo, setEditTodo] = useState({
    id: todo.id,
    name: todo.name,
    type: todo.type,
    isCompleted: todo.isCompleted
  })
  // console.log('status', status)
  useEffect(() => {
    setStatus(statusModified);
  }, [statusModified]);

  // const {deleteTodo} = useDeleteTodo();
  // const {updateTodo} = useUpdateTodo();
  const handleCheck = (e) => {
    parentFunction(e.target.checked);
    setStatus(e.target.checked);
  };

  const onDelete = () => {
    const id = todo.id
   axios.delete(`http://localhost:3000/todos/${id}`).then(() => setTodo(prev => prev.filter(todo => todo.id != id) ))
  }
  const onEdit = (todo) => {
    openModal('edit',todo)
    toggleModal(true)
    setMode('edit')
    setEditTodo(todo)
  }
  return (
    <>
      <tr className={!status ? classes.todo : (status && classes.completed)} >
        <td>{todo.name?.toString()}</td>
        <td>{todo.type?.toString()}</td>
        <td>
          <input type="checkbox" checked={!!status} onChange={handleCheck} />
        </td>
        <td onClick={() => onEdit(todo)}><GoPencil /></td>
        <td onClick={onDelete}><MdDeleteOutline /></td>
      </tr>
    </>
  );
}
