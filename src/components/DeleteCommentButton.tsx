import { Box, Tooltip } from '@chakra-ui/react';
import { Dispatch, FC, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Comment } from '../reduxStore/reducers/PostReducer';
import { PostActionTypes } from '../reduxStore/reduxTypes/PostTypes';
import axiosInstance from '../utils/AxiosInterceptor';
import './components.css';
import GlobalAlertDialog from './GlobalAlertDialog';

const DeleteCommentButton: FC<{ comment: Comment }> = ({ comment }) => {
  const dispatch = useDispatch<Dispatch<PostActionTypes>>();
  const [searchParam] = useSearchParams();
  const postIdFromParam = searchParam.get('id');
  const deleteCommentHandler = async () => {
    try {
      await axiosInstance.delete(`/api/comment/${comment._id}`);
      if (postIdFromParam) {
        dispatch({
          type: 'DELETE_COMMENT_FROM_DETAIL_POST_PAGE',
          payload: { commentId: comment._id },
        });
      } else {
        dispatch({
          type: 'DELETE_COMMENT',
          payload: { commentId: comment._id, postId: comment.post },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const ref = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <GlobalAlertDialog
      action={deleteCommentHandler}
      cancelRef={ref}
      isOpen={isOpen}
      title="Delete Comment"
      message="Are you sure to delete this comment ?"
      onClose={() => setIsOpen(false)}
    >
      <Tooltip label="Delete comment">
        <Box onClick={() => setIsOpen(true)} mt="-1" ml="5">
          <i className="fas fa-trash small-icon delete-icon"></i>
        </Box>
      </Tooltip>
    </GlobalAlertDialog>
  );
};

export default DeleteCommentButton;
