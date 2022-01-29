import { Box, Tooltip, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reduxStore';
import NotificationList from './NotificationList';

const NotificationButton = () => {
  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box position="relative">
      <Tooltip label="Notifications">
        <Button onClick={() => setIsOpen((prev) => !prev)}>
          {notifications.length > 0 && (
            <Box
              position="absolute"
              bottom="3"
              left="8"
              border="1px solid red"
              textAlign="center"
              w="6"
              h="6"
              bg="red"
              borderRadius="full"
            >
              <Text textAlign="center" fontWeight="bold" color="white">
                {notifications.length}
              </Text>
            </Box>
          )}
          <i className="fas fa-bell fa-2x"></i>
        </Button>
      </Tooltip>
      {notifications.length > 0 && isOpen && (
        <NotificationList notifications={notifications} />
      )}
    </Box>
  );
};

export default NotificationButton;
