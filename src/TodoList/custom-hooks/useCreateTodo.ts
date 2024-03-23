import { useEffect, useState } from "react"
import { useBaseUrlInstance } from "../../BaseUrlProvider";

export const useCreateTodo = () => {
    const [response, setResponse] = useState()
    const axios = useBaseUrlInstance();


    const postRequest = (payload) =>  axios.post('',payload).then(({data}) => setResponse(data));

    return {postRequest, response}
}