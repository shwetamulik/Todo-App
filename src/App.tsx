import "./App.css";
import TodoList from "./TodoList/components/TodoList";
import BaseUrlContext from "./TodoList/BaseUrlContext";
// import { useFetch } from "./TodoList/custom-hooks/useFetch";
import axios from "axios";
import { useMemo } from "react";
import { BaseUrlProvider } from "./BaseUrlProvider";

const Products = () => {
  // const { data: products } = useFetch();

  return (
    <>
      {/* <h3>Products</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul> */}
    </>
  );
};

function App() {


  return (
    <main>
      {/* <BaseUrlContext.Provider value={rootAxios}>
        <Products />
        <TodoList />
      </BaseUrlContext.Provider> */}
      {/* <BaseUrlProvider relativeUrl='todos'> */}
      <TodoList />
      {/* </BaseUrlProvider> */}

      {/* <BaseUrlProvider relativeUrl='products'> */}
      <Products/>
      {/* </BaseUrlProvider> */}
    </main>
  );
}

export default App;
