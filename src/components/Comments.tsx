import { Avatar, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Comment } from '../reduxStore/reducers/PostReducer';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { RootState } from '../reduxStore';
import './components.css';
import DeleteCommentButton from './DeleteCommentButton';
import LikeCommentButton from './LikeCommentButton';
import GlobalAccordion from './GlobalAccordion';
import { useSearchParams } from 'react-router-dom';

const Comments: FC<{ comments: Comment[] }> = ({ comments }) => {
  const { authenticatedUser } = useSelector((state: RootState) => state.auth);

  const usernameAndTime = (comment: Comment) => (
    <Flex flexDir="column" alignItems="start">
      <Text fontWeight="bold" fontSize="small">
        {comment.owner.username}
      </Text>
      <Text mt="-1" fontSize="xs" color="GrayText">
        <Moment fromNow>{comment.createdAt}</Moment>
      </Text>
    </Flex>
  );

  const showNumberOfLikes = (comment: Comment) => (
    <Flex>
      <Text fontSize="xs" color="GrayText">
        {comment.likes.length !== 0 && comment.likes.length}
        &nbsp;
      </Text>
      <Text fontSize="xs" color="GrayText">
        {comment.likes.length === 0
          ? ''
          : comment.likes.length > 1
          ? ' likes'
          : ' like'}
      </Text>
    </Flex>
  );

  const [searchParam] = useSearchParams();
  const postIdFromParam = searchParam.get('id');

  const commentsComponent = () => {
    return (
      <>
        {comments.map((comment) => {
          const isLiked = () => {
            return comment.likes.find(
              (user) => user._id === authenticatedUser?._id
            );
          };
          return (
            <Flex alignItems="flex-start" mb="3" ml="5" key={comment._id}>
              <Avatar size="sm" src={comment.owner.avatarURL} />
              <Flex w="100%" alignItems="start" justifyContent="space-between">
                <Flex ml="5" flexDir="column" w="100%">
                  <Flex alignItems="start" justifyContent="space-between">
                    <Flex alignItems="flex-start" gap="5px">
                      {usernameAndTime(comment)}
                      {comment.owner._id === authenticatedUser?._id && (
                        <DeleteCommentButton comment={comment} />
                      )}
                    </Flex>
                  </Flex>
                  <Text whiteSpace="pre-line" fontSize="small">
                    {comment.body}
                  </Text>
                </Flex>
                <Flex flexDir="column" alignItems="flex-end">
                  {showNumberOfLikes(comment)}
                  <LikeCommentButton comment={comment} isLiked={isLiked} />
                </Flex>
              </Flex>
            </Flex>
          );
        })}
      </>
    );
  };

  return (
    <>
      {postIdFromParam ? (
        commentsComponent()
      ) : (
        <GlobalAccordion label={`${comments.length} comments`}>
          {commentsComponent()}
        </GlobalAccordion>
      )}
    </>
  );
};

export default Comments;
