import axios from "axios";
import { createContext, useContext, useMemo } from "react";

const BaseUrlContext = createContext();

export const BaseUrlProvider = ({relativeUrl, children}) => {

    const rootAxios = useMemo(
        () =>
          axios.create({
            baseURL: `http://localhost:3000/${relativeUrl}`,
          }),
        []
      );
    return(
       <BaseUrlContext.Provider value={rootAxios} >
        {children}
      </BaseUrlContext.Provider> 
    )
}

export const useBaseUrlInstance = () => {
   const contextValue = useContext(BaseUrlContext);
   return contextValue;
}