import { useDispatch } from 'react-redux';
import { clearToken } from '../redux/reducers/auth';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(clearToken());
        navigate('/')
    }

  return handleLogout;
}

export default useLogout