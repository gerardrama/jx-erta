import { useEffect } from 'react'
import './App.css'
import MainRouter from './router';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from './redux/store';
import { setToken } from './redux/reducers/auth';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    dispatch(setToken(localStorage.getItem("token")));
  },[])

  useEffect(() => {
    if(token) navigate('/dashboard');
  }, [token])

  return (
    <>
      <MainRouter token={token}/>
    </>
  )
}

export default App
