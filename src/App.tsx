import { Box, Spinner } from '@chakra-ui/react';
import { useState, useEffect, Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { Home, Login, Register } from './pages';
import PostDetail from './pages/PostDetail';
import { AuthActionsType } from './store/types/AuthTypes';
import { NotificationActionTypes } from './store/types/NotificationTypes';
import axiosInstance from './utils/AxiosInterceptor';

const App = () => {
  const [isMounted, setIsMounted] = useState(true);
  const dispatch =
    useDispatch<Dispatch<AuthActionsType | NotificationActionTypes>>();
  const [isLoading, setIsLoading] = useState(true);
  const fetchUser = async () => {
    try {
      dispatch({ type: 'LOADING_AUTH' });
      await axiosInstance.get('/api/auth/refresh-token');
      const { data } = await axiosInstance.get('/api/user/me');
      if (isMounted) {
        dispatch({
          type: 'SET_AUTHENTICATED',
          payload: data.user,
        });
        dispatch({
          type: 'SET_NOTIFICATIONS',
          payload: data.notifications,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: 'STOP_LOADING_AUTH' });
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
    return () => {
      setIsMounted(false);
    };
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return (
      <Box
        d="flex"
        h="100vh"
        w="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" />
      </Box>
    );
  }
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<PostDetail />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
