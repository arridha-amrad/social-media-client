import { Box, Tooltip, Text, Button } from '@chakra-ui/react';
import { Dispatch, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reduxStore';
import { NotificationActionTypes } from '../reduxStore/reduxTypes/NotificationTypes';
import axiosInstance from '../utils/AxiosInterceptor';
import NotificationList from './NotificationList';

const NotificationButton = () => {
  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch<Dispatch<NotificationActionTypes>>();

  const unCheckedNotifications = notifications.filter(
    (notification) => notification.isChecked === false
  );

  const checkNotification = async () => {
    try {
      if (unCheckedNotifications.length > 0) {
        await axiosInstance.post('/api/notification/set-check');
        dispatch({
          type: 'CHECK_NOTIFICATION',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box position="relative">
      <Tooltip label="Notifications">
        <Button
          onClick={() => {
            setIsOpen((prev) => !prev);
            checkNotification();
          }}
        >
          {unCheckedNotifications.length > 0 && (
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
                {unCheckedNotifications.length}
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
