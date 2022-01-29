import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reduxStore';
import { Box, Container, Flex, Spinner } from '@chakra-ui/react';
import { Dispatch, useEffect, useState } from 'react';
import CreatePost from '../components/CreatePost';
import Posts from '../components/Posts';
import axiosInstance from '../utils/AxiosInterceptor';
import { PostActionTypes } from '../reduxStore/reduxTypes/PostTypes';
import { PostData } from '../reduxStore/reducers/PostReducer';
import { io } from 'socket.io-client';
import { SocketActionType } from '../reduxStore/reducers/SocketReducer';
import { NotificationActionTypes } from '../reduxStore/reduxTypes/NotificationTypes';

const Home = () => {
  const {
    posts: { isLoadingPost, posts, isFetched },
    auth: { isAuthenticated, isLoadingAuth, authenticatedUser },
    socket,
  } = useSelector((state: RootState) => state);

  const [mounted, setIsMounted] = useState(true);

  const dispatch =
    useDispatch<
      Dispatch<PostActionTypes | SocketActionType | NotificationActionTypes>
    >();

  const fetchPosts = async () => {
    try {
      dispatch({ type: 'LOADING_POST' });
      const { data } = await axiosInstance.get('/api/post');
      const posts = data.posts as PostData[];
      if (mounted) {
        dispatch({
          type: 'ADD_POSTS',
          payload: posts,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: 'STOP_LOADING_POST' });
    }
  };
  useEffect(() => {
    if (!isFetched) {
      fetchPosts();
    }
    if (!isLoadingAuth && isAuthenticated) {
      const socket = io('http://localhost:5000');
      dispatch({
        type: 'SET_SOCKET',
        payload: socket,
      });
    }
    return () => {
      setIsMounted(false);
      socket?.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (authenticatedUser?.username) {
      socket?.emit('addUser', authenticatedUser.username);
    }
    socket?.on('likeAlert', (payload) => {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: payload,
      });
    });
    socket?.on('commentAlert', (payload) => {
      console.log('comment payload : ', payload);
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload,
      });
    });
  }, [socket]);

  const loading = () => (
    <Flex w="100%" alignItems="center" justifyContent="center">
      <Spinner />
    </Flex>
  );
  return (
    <Container maxW="container.lg">
      <CreatePost />
      <Box mt="5">{isLoadingPost ? loading() : <Posts posts={posts} />}</Box>
    </Container>
  );
};

export default Home;
