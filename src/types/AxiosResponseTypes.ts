import { Notification } from '../reduxStore/reducers/NotificationReducer';
import { Comment } from '../reduxStore/reducers/PostReducer';

export interface AxiosResponseLikeComment {
  comment: Comment;
  notification: Notification;
}
