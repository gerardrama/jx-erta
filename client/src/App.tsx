import { useState } from 'react'
import TaskBoard from "./components/TaskBoard";
import './App.css'
import MainRouter from './router';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MainRouter/>
    </>
  )
}

export default App
