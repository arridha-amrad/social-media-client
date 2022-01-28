import { User } from '../../interfacesAndTypes';
import { NotificationActionTypes } from '../types/NotificationTypes';
import { PostData } from './PostReducer';

export interface NotificationSender {
  _id: string;
  username: string;
  avatarURL: string;
}

export type NotificationType = 'likeComment' | 'likePost' | 'commentPost';

export interface Notification {
  _id?: string;
  receiver: User;
  sender: User;
  type: NotificationType;
  isRead: boolean;
  isChecked: boolean;
  createdAt: Date;
  updatedAt: Date;
  post?: PostData;
  comment?: Comment;
}

export interface NotificationState {
  isLoadingNotifications: boolean;
  notifications: Notification[];
}

const initialState: NotificationState = {
  isLoadingNotifications: false,
  notifications: [],
};

export default function NotificationReducer(
  state = initialState,
  action: NotificationActionTypes
): NotificationState {
  switch (action.type) {
    case 'LOADING_NOTIFICATIONS':
      return {
        ...state,
        isLoadingNotifications: true,
      };
    case 'STOP_LOADING_NOTIFICATIONS':
      return {
        ...state,
        isLoadingNotifications: false,
      };
    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload,
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    default:
      return state;
  }
}
