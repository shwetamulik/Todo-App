import { useBaseUrlInstance } from "../../BaseUrlProvider";

export const useDeleteTodo = () => {
const axios = useBaseUrlInstance();
const deleteTodo = (id) =>  axios.delete(`/${id}`)
return {deleteTodo}
 
}