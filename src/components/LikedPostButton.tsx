import { Box, Button } from '@chakra-ui/react';
import { Dispatch, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { PostData } from '../store/reducers/PostReducer';
import { PostActionTypes } from '../store/types/PostTypes';
import axiosInstance from '../utils/AxiosInterceptor';
import './components.css';

const LikedPostButton: FC<{ post: PostData }> = ({ post }) => {
  const {
    auth: { authenticatedUser },
    socket,
  } = useSelector((state: RootState) => state);

  const dispatch = useDispatch<Dispatch<PostActionTypes>>();
  const isLiked = post.likes.find(
    (userId) => userId === authenticatedUser?._id
  );
  const handleLike = async () => {
    try {
      // no notification if loginUser like his own post
      if (post.owner.username !== authenticatedUser?.username) {
        if (!isLiked) {
          socket?.emit(
            'likePost',
            {
              receiver: post.owner,
              sender: authenticatedUser!,
              createdAt: new Date(),
              isChecked: false,
              isRead: false,
              type: 'likePost',
              updatedAt: new Date(),
              post: post,
            },
            post.owner.username
          );
        }
      }
      await axiosInstance.post(`/api/post/like-dislike/${post._id}`);
      dispatch({
        type: 'LIKE_POST_OR_DISLIKE',
        payload: {
          postId: post._id,
          userId: authenticatedUser!._id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Button onClick={handleLike}>
      {post.likes.length > 0 && post.likes.length}
      <Box ml={post.likes.length === 0 ? '0' : '5'}>
        {isLiked ? (
          <i className="fas fa-heart isLiked"></i>
        ) : (
          <i className="far fa-heart"></i>
        )}
      </Box>
    </Button>
  );
};

export default LikedPostButton;
