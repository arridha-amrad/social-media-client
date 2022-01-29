import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import AuthReducer from './reducers/AuthReducer';
import NotificationReducer from './reducers/NotificationReducer';
import PostReducer from './reducers/PostReducer';
import SocketReducer from './reducers/SocketReducer';

const initialState = {};

const middleware = [thunkMiddleware];

const reducers = combineReducers({
  auth: AuthReducer,
  posts: PostReducer,
  notifications: NotificationReducer,
  socket: SocketReducer,
});

export type RootState = ReturnType<typeof reducers>;

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middleware), composeEnhancers())
);

export default store;
