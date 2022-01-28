import { Box, Tooltip, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import NotificationList from './NotificationList';

const NotificationButton = () => {
  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box position="relative">
      <Tooltip label="Notifications">
        <Box
          onClick={() => setIsOpen((prev) => !prev)}
          cursor="pointer"
          position="relative"
        >
          {notifications.length > 0 && (
            <Box
              position="absolute"
              top="3"
              right="4"
              border="1px solid red"
              textAlign="center"
              w="7"
              h="7"
              bg="red"
              borderRadius="full"
            >
              <Text fontWeight="bold" color="white">
                {notifications.length}
              </Text>
            </Box>
          )}
          <i className="fas fa-bell fa-2x"></i>
        </Box>
      </Tooltip>
      {notifications.length > 0 && isOpen && (
        <NotificationList notifications={notifications} />
      )}
    </Box>
  );
};

export default NotificationButton;
