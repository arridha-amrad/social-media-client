import { Box, Tooltip } from '@chakra-ui/react';
import { Dispatch, FC, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PostData } from '../reduxStore/reducers/PostReducer';
import { PostActionTypes } from '../reduxStore/reduxTypes/PostTypes';
import axiosInstance from '../utils/AxiosInterceptor';
import GlobalAlertDialog from './GlobalAlertDialog';

const DeletePostButton: FC<{ post: PostData }> = ({ post }) => {
  const dispatch = useDispatch<Dispatch<PostActionTypes>>();
  const [searchParam] = useSearchParams();

  const navigate = useNavigate();

  const postIdFromParam = searchParam.get('id');
  const deletePostHandler = async () => {
    try {
      await axiosInstance.delete(`/api/post/${post._id}`);
      dispatch({ type: 'DELETE_POST', payload: { postId: post._id } });
      if (postIdFromParam) {
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };
  const ref = useRef<HTMLButtonElement>();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <GlobalAlertDialog
      action={deletePostHandler}
      cancelRef={ref}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Delete this post"
      message="Are you sure to delete this post ?"
    >
      <Tooltip label="Delete post">
        <Box onClick={() => setIsOpen(true)} ml="3">
          <i className="fas fa-trash small-icon delete-icon"></i>
        </Box>
      </Tooltip>
    </GlobalAlertDialog>
  );
};

export default DeletePostButton;
