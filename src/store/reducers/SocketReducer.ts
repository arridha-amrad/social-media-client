import { Socket } from 'socket.io-client';
import { Notification } from './NotificationReducer';

const SET_SOCKET = 'SET_SOCKET';

export type SocketActionType = { type: typeof SET_SOCKET; payload: Socket };

interface ServerToClientEvents {
  likeAlert: (data: Notification) => void;
}

interface ClientToServerEvents {
  addUser: (username: string) => void;
  likePost: (notification: Notification, toUsername: string) => void;
}

const initialState: Socket<ServerToClientEvents, ClientToServerEvents> | null =
  null;

export default function SocketReducer(
  state = initialState,
  action: SocketActionType
): Socket<ServerToClientEvents, ClientToServerEvents> | null {
  switch (action.type) {
    case 'SET_SOCKET':
      return action.payload;
    default:
      return state;
  }
}
