import {
  Avatar,
  Box,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../reduxStore';
import Logout from './Logout';
import NotificationButton from './NotificationButton';

const Navbar = () => {
  const { authenticatedUser } = useSelector((state: RootState) => state.auth);
  return (
    <Box h="20" bg="whitesmoke">
      <Container
        maxW="container.lg"
        height="100%"
        d="flex"
        alignItems="center"
        justifyContent="space-between"
        size=""
      >
        <Box>
          <Text fontSize="large" fontWeight="bold" color="black">
            Social Media
          </Text>
        </Box>
        <Flex alignItems="center" gap="20">
          <NotificationButton />
          <Box>
            <Menu>
              <MenuButton>
                <Avatar src={authenticatedUser?.avatarURL} />
              </MenuButton>
              <MenuList>
                <Logout />
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
