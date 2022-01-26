import { Notification } from '../reducers/NotificationReducer';

export const LOADING_NOTIFICATIONS = 'LOADING_NOTIFICATIONS';
export const STOP_LOADING_NOTIFICATIONS = 'STOP_LOADING_NOTIFICATIONS';
export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';

export type NotificationActionTypes =
  | { type: typeof SET_NOTIFICATIONS; payload: Notification[] }
  | { type: typeof LOADING_NOTIFICATIONS }
  | { type: typeof STOP_LOADING_NOTIFICATIONS };
