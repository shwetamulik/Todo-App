import { useContext, useEffect, useRef, useState } from "react";
import Todo from "./Todo";
import { useFetch } from "../custom-hooks/useFetch";
import BaseUrlContext from "./BaseUrlContext";
import { useCreateTodo } from "../custom-hooks/useCreateTodo";
import { Modal } from "./Modal";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import { gsap } from 'gsap';

const getGlobalStatus = (statusMap) => {
  let count = 0;
  const statusArray = Object.values(statusMap);

  statusArray.forEach((ele) => {
    if (ele) {
      count++;
    }
  });
  if (count === statusArray.length) {
    return true;
  } else if (count === 0) {
    return false;
  }
  return null;
};
const getInitialStatusMap = (allTodos) =>
  allTodos.reduce((acc, ele) => {
    acc[ele.id] = ele.isCompleted;
    return acc;
  }, {});

export default function TodoList() {
  const parentCheck = useRef();
  const [todos, setTodos] = useState([]);
  console.count("todos", todos);
  console.log("todos", todos);

  const [statusMap, setStatusMap] = useState(() => getInitialStatusMap(todos));

  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("");
  const globalStatus = getGlobalStatus(statusMap);
  const [reload, setReload] = useState(false);
  const [todoToEdit,setTodoToEdit] = useState();
  let type = "";
  // const [parentStatus, setParentStatus] = useState(initialGlobalStatus);

  useEffect(() => {
    const response = axios.get("http://localhost:3000/todos").then((res) => {
      console.log("res", res.data);
      setTodos(res.data);
    });
    //  console.log('todos', todos)
  }, []);

  useEffect(() => {
    if (parentCheck.current) {
      parentCheck.current.indeterminate = globalStatus === null;
    }
  }, [globalStatus]);

  // useGSAP(() => {
  //   gsap.from('tr', {
  //     opacity: 0,
  //     y: -50,
  //     stagger: 0.2
  //   });
  // }, [todos]);

  // useEffect(() => {
  //   setReload(true);
  // }, [todos]);

  // useEffect(() => {
  //   setMode(type);
  //   console.log('type', type)
  // }, [type]);

  const changeParent = (isChecked, id) => {
    setStatusMap({ ...statusMap, [id]: isChecked });
  };

  const handleParentCheck = (e) => {
    const updatedStatusMap = {};

    for (const todoId in statusMap) {
      updatedStatusMap[todoId] = e.target.checked;
    }
    setStatusMap(updatedStatusMap);
  };

  // if (error) {
  //   return <h4>{error.message.toUpperCase()} !</h4>;
  // }

  const types = [
    { label: "Health", value: "health" },
    { label: "Work", value: "work" },
    { label: "Diet", value: "diet" },
  ];

  const openModal = (type, todo=null) => {
    console.log('todo', todo)
    console.log('type', type)
    type = "create";
    setModalOpen(true);
    setTodoToEdit(todo)
    setMode('create')
  };
  const closeModal = (toggleModal: boolean) => {
    setModalOpen(toggleModal);
  };
  return (
    <>
      {modalOpen && 
        <Modal
          isModalOpened={modalOpen}
          toggleModal={closeModal}
          mode={mode}
          setTodo={setTodos}
          todos={todoToEdit}
        />
 } 
 {!modalOpen &&
   <>
   <h3>Todo List</h3>
   <button onClick={()=>openModal('create')}>Create Todo</button>
   <table>
     <thead>
       <tr>
         <th>Name</th>
         <th>Type</th>
         <th>
           <input
             type="checkbox"
             checked={globalStatus}
             onChange={handleParentCheck}
             ref={parentCheck}
           />
         </th>
       </tr>
     </thead>
     <tbody>
       {todos.map((todo) => (
         <Todo
         key={todo.id}
           todo={todo}
           isCompleted={todo.isCompleted}
           parentFunction={(checked) => changeParent(checked, todo.id)}
           statusModified={statusMap[todo.id]}
           isModalOpened={modalOpen}
           toggleModal={closeModal}
           mode={mode}
           setMode={setMode}
           setTodo={setTodos}
           openModal={openModal}
         />
       ))}
     </tbody>
   </table>
 </>
 }
      
      
    </>
  );
}
