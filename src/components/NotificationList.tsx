import { Avatar, Box, Divider, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';
import { Notification } from '../reduxStore/reducers/NotificationReducer';

const NotificationList: FC<{
  notifications: Notification[];
  setClose: () => void;
}> = ({ notifications, setClose }) => {
  const navigate = useNavigate();
  return (
    <Box
      bg="white"
      zIndex="modal"
      position="absolute"
      top="12"
      right="0"
      w="lg"
      maxH="lg"
      overflowY="auto"
      p="3"
      shadow="md"
    >
      {notifications.map((notification, i) => {
        const senderName = notification.sender.username;
        let message;
        let link = `/post?id=${notification.post?._id}&commentId=${notification.comment?._id}`;
        if (notification.type === 'commentPost') {
          message = `${senderName} comment your post`;
        }
        if (notification.type === 'likeComment') {
          message = `${senderName} like your comment`;
        }
        if (notification.type === 'likePost') {
          message = `${senderName} like your post`;
          link = `/post?id=${notification.post?._id}`;
        }
        return (
          <Box key={i}>
            <Flex justifyContent="space-between">
              <Flex mb="2" alignItems={'center'}>
                <Box mt="-1" mr="3">
                  {!notification.isRead && (
                    <i className="fas fa-circle xs-icon "></i>
                  )}
                </Box>
                <Text
                  _hover={{ color: 'blue', textDecoration: 'underline' }}
                  cursor="pointer"
                  onClick={() => {
                    navigate(link);
                    setClose();
                  }}
                  fontSize="sm"
                >
                  {message}
                </Text>
              </Flex>
              <Text fontSize="sm" color="gray">
                <Moment fromNow>{notification.createdAt}</Moment>
              </Text>
            </Flex>
            {notification.type === 'likePost' && (
              <Flex ml="5" alignItems="center">
                <Box>
                  <i className="fas fa-heart isLiked"></i>
                </Box>
                <Flex ml="2" justifyContent="flex-start" alignItems="center">
                  <>
                    <Avatar size="xs" src={notification.receiver.avatarURL} />
                    <Flex ml="3" justifyContent="flex-start" flexDir="column">
                      <Text fontWeight="medium" fontSize="xs">
                        you
                      </Text>
                      <Text fontSize="xs">
                        {notification.post?.description}
                      </Text>
                    </Flex>
                  </>
                </Flex>
              </Flex>
            )}
            {notification.type === 'commentPost' && (
              <Flex ml="5" flexDir="column">
                <Flex alignItems="center">
                  <Box mr="2">
                    <i className="fas fa-comment-alt comment-notification"></i>
                  </Box>
                  <Avatar size="xs" src={notification.receiver.avatarURL} />
                  <Flex ml="3" justifyContent="flex-start" flexDir="column">
                    <Text fontWeight="medium" fontSize="xs">
                      you
                    </Text>
                    <Text fontSize="xs">{notification.post?.description}</Text>
                  </Flex>
                </Flex>
                <Flex ml="8" alignItems="center">
                  <Box mr="2">
                    <i className="fas fa-reply rotation"></i>
                  </Box>
                  <Avatar size="xs" src={notification.sender.avatarURL} />
                  <Flex ml="3" justifyContent="flex-start" flexDir="column">
                    <Text fontSize="xs">{notification.sender.username}</Text>
                    <Text fontSize="xs">{notification.comment?.body}</Text>
                  </Flex>
                </Flex>
              </Flex>
            )}
            {notification.type === 'likeComment' && (
              <Flex ml="5" alignItems="center">
                <Box>
                  <i className="fas fa-heart isLiked"></i>
                </Box>
                <Flex ml="2" justifyContent="flex-start" alignItems="center">
                  <>
                    <Avatar size="xs" src={notification.receiver.avatarURL} />
                    <Flex ml="3" justifyContent="flex-start" flexDir="column">
                      <Text fontWeight="medium" fontSize="xs">
                        you
                      </Text>
                      <Text fontSize="xs">{notification.comment?.body}</Text>
                    </Flex>
                  </>
                </Flex>
              </Flex>
            )}
            {notifications.length > 1 && i + 1 !== notifications.length && (
              <Divider my="2" />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default NotificationList;
