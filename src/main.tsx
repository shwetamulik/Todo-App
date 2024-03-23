import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


// const Parent = () => {
//   const onButtonClick = (e) => {};

//   return <Child onButtonClick={onButtonClick} />
// }

// const Child = ({onButtonClick}) => {
//   return <button onClick={onButtonClick}>Click me!</button>;
// }
