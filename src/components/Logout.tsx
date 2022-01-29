import { MenuItem } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActionsType } from '../reduxStore/reduxTypes/AuthTypes';
import axiosInstance from '../utils/AxiosInterceptor';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from 'react';
import { RootState } from '../reduxStore';

const Logout = () => {
  const dispatch = useDispatch<Dispatch<AuthActionsType>>();
  const navigate = useNavigate();
  const { socket } = useSelector((state: RootState) => state);
  const handleLogout = async () => {
    try {
      socket?.disconnect();
      await axiosInstance.post('/api/auth/logout');
      dispatch({
        type: 'SET_UNAUTHENTICATED',
      });
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };
  return <MenuItem onClick={handleLogout}>Logout</MenuItem>;
};

export default Logout;
