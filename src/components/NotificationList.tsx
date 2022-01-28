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
                  <i className="fas fa-circle xs-icon "></i>
                </Box>
                <Text fontSize="sm">{message}</Text>
              </Flex>
              <Text fontSize="sm" color="gray">
                <Moment fromNow>{notification.createdAt}</Moment>
              </Text>
            </Flex>
            <Flex ml="5" alignItems="center">
              <Box>
                <i className="fas fa-heart isLiked"></i>
              </Box>
              <Flex ml="2" justifyContent="flex-start" alignItems="center">
                {notification.type === 'likePost' && (
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
                )}
              </Flex>
            </Flex>
            {notifications.length > 1 && <Divider my="2" />}
          </Box>
        );
      })}
    </Box>
  );
};

export default NotificationList;
