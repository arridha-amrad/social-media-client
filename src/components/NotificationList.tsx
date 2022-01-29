import { Avatar, Box, Divider, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import Moment from 'react-moment';
import { Notification } from '../store/reducers/NotificationReducer';

const NotificationList: FC<{ notifications: Notification[] }> = ({
  notifications,
}) => {
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
        if (notification.type === 'commentPost') {
          message = `${senderName} comment your post`;
        }
        if (notification.type === 'likeComment') {
          message = `${senderName} like your comment`;
        }
        if (notification.type === 'likePost') {
          message = `${senderName} like your post`;
        }
        return (
          <Box key={i}>
            <Flex justifyContent="space-between">
              <Flex mb="2" alignItems={'center'}>
                <Box mt="-1" mr="3">
                  {!notification.isChecked && (
                    <i className="fas fa-circle xs-icon "></i>
                  )}
                </Box>
                <Text fontSize="sm">{message}</Text>
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
                    <Avatar
                      size="xs"
                      src={notification.post?.owner.avatarURL}
                    />
                    <Flex ml="3" justifyContent="flex-start" flexDir="column">
                      <Text fontSize="xs">
                        {notification.post?.owner.username}
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
                    <Text fontSize="xs">{notification.receiver.username}</Text>
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
