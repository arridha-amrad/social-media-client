import { Avatar, Box, Container, Flex, Text } from '@chakra-ui/react';
import { Dispatch, useEffect } from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import AddPostCommentBox from '../components/AddPostCommentBox';
import CommentButton from '../components/CommentButton';
import Comments from '../components/Comments';
import DeletePostButton from '../components/DeletePostButton';
import EditPostButton from '../components/EditPostButton';
import EditPostForm from '../components/EditPostForm';
import { RootState } from '../reduxStore';
import axiosInstance from '../utils/AxiosInterceptor';
import LikedPostButton from '../components/LikedPostButton';
import { setLikes } from '../utils/likeHelpers';
import { PostActionTypes } from '../reduxStore/reduxTypes/PostTypes';

const PostDetail = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<Dispatch<PostActionTypes>>();
  const postId = searchParams.get('id');
  const commentId = searchParams.get('commentId');

  const fetchPost = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/post/${postId}`);
      dispatch({
        type: 'SET_POST_FROM_DETAIL_POST_PAGE',
        payload: data.post,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const {
    auth: { authenticatedUser },
    posts: { post },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId, commentId]);

  return (
    <Container size="lg">
      {post && (
        <Box
          mt="8"
          p="5"
          mb="10"
          w="100%"
          key={post._id}
          borderWidth="medium"
          borderStyle="solid"
        >
          <Flex alignItems="start">
            <Avatar src={post.owner.avatarURL} />
            <Flex flexDir="column" justify="flex-start" width="100%">
              <Flex>
                <Box ml="5">{post.owner.username}</Box>
                {post.owner._id === authenticatedUser?._id && (
                  <>
                    <EditPostButton post={post} />
                    <DeletePostButton post={post} />
                  </>
                )}
              </Flex>
              <Text ml="5" color="GrayText" fontSize="sm">
                <Moment fromNow>{post.createdAt}</Moment>
              </Text>
              {post.isEdit ? (
                <EditPostForm post={post} />
              ) : (
                <Box whiteSpace="pre-line" py="4" ml="5" minH={'10'}>
                  <Text>{post.description}</Text>
                </Box>
              )}
              <Box ml="5">
                <LikedPostButton post={post} />
                <CommentButton post={post} />
                {postId && (
                  <Box mt="2" fontSize="sm">
                    liked by
                    <Text d="inline" ml="1" fontWeight="semibold">
                      {setLikes(post.likes, authenticatedUser!)}
                    </Text>
                  </Box>
                )}
              </Box>

              <AddPostCommentBox post={post} />
              {post.comments.length > 0 && (
                <Box mt="5">
                  <Comments comments={post.comments} />
                </Box>
              )}
            </Flex>
          </Flex>
        </Box>
      )}
    </Container>
  );
};

export default PostDetail;
