import {
  Box,
  Button,
  InputGroup,
  InputRightElement,
  Textarea,
} from '@chakra-ui/react';
import { Dispatch, FC, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RootState } from '../reduxStore';
import { PostData } from '../reduxStore/reducers/PostReducer';
import { PostActionTypes } from '../reduxStore/reduxTypes/PostTypes';
import axiosInstance from '../utils/AxiosInterceptor';

const AddPostCommentBox: FC<{ post: PostData }> = ({ post }) => {
  const {
    posts: { isLoadingComment },
    socket,
  } = useSelector((state: RootState) => state);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch<Dispatch<PostActionTypes>>();
  const ref = useRef<HTMLTextAreaElement>(null);
  const [setSearchParam] = useSearchParams();
  const postIdFromParam = setSearchParam.get('id');
  const navigate = useNavigate();
  const sendCommentHandler = async () => {
    try {
      dispatch({
        type: 'LOADING_COMMENT',
      });
      const { data } = await axiosInstance.post(`/api/comment/${post._id}`, {
        body: comment,
      });
      if (postIdFromParam) {
        dispatch({
          type: 'ADD_COMMENT_FROM_DETAIL_POST_PAGE',
          payload: data.comment,
        });
      } else {
        dispatch({
          type: 'ADD_COMMENT',
          payload: {
            postId: post._id,
            comment: data.comment,
          },
        });
      }
      if (data.notification) {
        socket?.emit('addComment', data.notification, post.owner.username);
      }
    } catch (err: any) {
      console.log(err);
      if (err.response.status === 404) {
        navigate('/');
        dispatch({
          type: 'DELETE_POST',
          payload: { postId: post._id },
        });
      }
    } finally {
      dispatch({
        type: 'STOP_LOADING_COMMENT',
      });
      ref.current!.value = '';
      setComment('');
    }
  };
  return (
    <Box mt="2" ml="5">
      <InputGroup>
        <Textarea
          ref={ref}
          onChange={(e) => setComment(e.target.value)}
          resize="none"
          pr="4.5rem"
          type="text"
          placeholder="type your comment..."
        />
        <InputRightElement width="4.5rem">
          <Button
            isLoading={isLoadingComment}
            isDisabled={comment.trim() === ''}
            colorScheme="blue"
            h="1.75rem"
            size="sm"
            onClick={sendCommentHandler}
          >
            Send
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default AddPostCommentBox;
