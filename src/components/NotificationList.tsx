import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Notification } from '../store/reducers/NotificationReducer';

const NotificationList: FC<{ notifications: Notification[] }> = ({
  notifications,
}) => {
  return (
    <Box
      bg="gray.100"
      border="1px solid gray"
      zIndex="modal"
      position="absolute"
      top="12"
      right="0"
      w="lg"
      maxH="lg"
      p="3"
    >
      {notifications.map((notification) => {
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
          <Box key={notification._id}>
            <Text>
              <i className="fas fa-circle small-icon"></i> {message}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
};

export default NotificationList;
