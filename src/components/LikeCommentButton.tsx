import { Box } from '@chakra-ui/react';
import { Dispatch, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { User } from '../interfacesAndTypes';
import { RootState } from '../reduxStore';
import { Comment } from '../reduxStore/reducers/PostReducer';
import { PostActionTypes } from '../reduxStore/reduxTypes/PostTypes';
import { AxiosResponseLikeComment } from '../types/AxiosResponseTypes';
import axiosInstance from '../utils/AxiosInterceptor';

const LikeCommentButton: FC<{
  comment: Comment;
  isLiked: () => User | undefined;
}> = ({ comment, isLiked }) => {
  const {
    auth: { authenticatedUser },
    socket,
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch<PostActionTypes>>();

  const [searchParam] = useSearchParams();
  const postIdFromParam = searchParam.get('id');

  const likeCommentHandler = async (comment: Comment) => {
    try {
      const { data } = await axiosInstance.post<AxiosResponseLikeComment>(
        `/api/comment/like-dislike/${comment._id}`
      );
      if (postIdFromParam) {
        dispatch({
          type: 'TOGGLE_LIKE_COMMENT_FROM_DETAIL_POST_PAGE',
          payload: { commentId: comment._id, user: authenticatedUser! },
        });
      } else {
        dispatch({
          type: 'TOGGLE_LIKE_COMMENT',
          payload: {
            commentId: comment._id,
            postId: comment.post,
            user: authenticatedUser!,
          },
        });
      }
      if (data.notification) {
        socket?.emit('likeComment', data.notification, comment.owner.username);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box onClick={() => likeCommentHandler(comment)}>
      {isLiked() ? (
        <i className="fas fa-heart comment-heart isLiked"></i>
      ) : (
        <i className="far fa-heart comment-heart"></i>
      )}
    </Box>
  );
};

export default LikeCommentButton;
