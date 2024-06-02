import { useDispatch } from 'react-redux';
import { clearToken } from '../redux/reducers/auth';
import { useNavigate } from 'react-router-dom';
import { useLazyLogoutQuery } from '../redux/services/endpoints';

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logout] = useLazyLogoutQuery();

    const handleLogout = () => {
        logout();
        localStorage.removeItem('token');
        dispatch(clearToken());
        navigate('/')
    }

  return handleLogout;
}

export default useLogout