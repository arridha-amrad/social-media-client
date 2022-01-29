import { Notification } from '../reducers/NotificationReducer';

export const LOADING_NOTIFICATIONS = 'LOADING_NOTIFICATIONS';
export const STOP_LOADING_NOTIFICATIONS = 'STOP_LOADING_NOTIFICATIONS';
export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const CHECK_NOTIFICATION = 'CHECK_NOTIFICATION';

export type NotificationActionTypes =
  | { type: typeof SET_NOTIFICATIONS; payload: Notification[] }
  | { type: typeof LOADING_NOTIFICATIONS }
  | { type: typeof ADD_NOTIFICATION; payload: Notification }
  | { type: typeof CHECK_NOTIFICATION }
  | { type: typeof STOP_LOADING_NOTIFICATIONS };
