import { Box, Tooltip, Text } from '@chakra-ui/react';
import { useState } from 'react';
import NotificationList from './NotificationList';

const NotificationButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box position="relative">
      <Tooltip label="Notifications">
        <Box
          onClick={() => setIsOpen((prev) => !prev)}
          cursor="pointer"
          position="relative"
        >
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
              5
            </Text>
          </Box>
          <i className="fas fa-bell fa-2x"></i>
        </Box>
      </Tooltip>
      {isOpen && <NotificationList />}
    </Box>
  );
};

export default NotificationButton;
