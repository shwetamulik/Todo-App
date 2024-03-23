import { useEffect } from "react"
import { useBaseUrlInstance } from "../../BaseUrlProvider"

export const useUpdateTodo = () => {
const axios = useBaseUrlInstance();
const updateTodo = (id, payload) => axios.put(`/${id}`, payload)

return {updateTodo}
}