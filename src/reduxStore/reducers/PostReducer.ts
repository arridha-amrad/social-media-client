import { User } from '../../interfacesAndTypes';
import { PostActionTypes } from '../reduxTypes/PostTypes';

export interface Comment {
  _id: string;
  body: string;
  owner: User;
  likes: User[];
  post: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostData {
  _id: string;
  description: string;
  owner: User;
  comments: Comment[];
  likes: User[];
  createdAt: Date;
  updatedAt: Date;
  isEdit: boolean;
  isComment: boolean;
  imagesURL?: string[];
}

export interface PostState {
  post: PostData | null;
  posts: PostData[];
  isLoadingPost: boolean;
  isFetched: boolean;
  isLoadingComment: boolean;
}

const initialState: PostState = {
  post: null,
  posts: [],
  isFetched: false,
  isLoadingPost: false,
  isLoadingComment: false,
};

export default function PostReducer(
  state = initialState,
  action: PostActionTypes
): PostState {
  const { posts, post } = state;
  const postsCopy = [...posts];
  const postCopy = { ...post };
  const findPostIndex = (postId: string) => {
    return posts.findIndex((post) => post._id === postId);
  };
  const findCommentIndex = (post: PostData, commentId: string) => {
    return post.comments.findIndex((comment) => comment._id === commentId);
  };
  switch (action.type) {
    case 'LOADING_COMMENT':
      return {
        ...state,
        isLoadingComment: true,
      };
    case 'STOP_LOADING_COMMENT':
      return {
        ...state,
        isLoadingComment: false,
      };
    case 'LOADING_POST':
      return {
        ...state,
        isLoadingPost: true,
      };
    case 'ADD_POSTS':
      return {
        ...state,
        posts: action.payload,
        isFetched: true,
      };
    case 'ADD_POST':
      return {
        ...state,
        posts: [action.payload, ...posts],
      };
    case 'STOP_LOADING_POST':
      return {
        ...state,
        isLoadingPost: false,
      };
    case 'SET_POST_FROM_DETAIL_POST_PAGE':
      return {
        ...state,
        post: action.payload,
      };

    case 'TOGGLE_LIKE_COMMENT_FROM_DETAIL_POST_PAGE':
      const { user, commentId } = action.payload;
      const toggleLikeComment = () => {
        const commentIndex = postCopy.comments?.findIndex(
          (comment) => comment._id === commentId
        );
        const isLiked = postCopy.comments![commentIndex!].likes.find(
          (likeUser) => likeUser._id === user._id
        );
        if (isLiked) {
          postCopy.comments![commentIndex!].likes = postCopy.comments![
            commentIndex!
          ].likes.filter((likeUser) => likeUser._id !== user._id);
        } else {
          postCopy.comments![commentIndex!].likes.push(user);
        }
        return postCopy as PostData;
      };
      return {
        ...state,
        post: toggleLikeComment(),
      };

    case 'DELETE_COMMENT_FROM_DETAIL_POST_PAGE':
      const removeComment = () => {
        const filteredComments = postCopy.comments?.filter(
          (comment) => comment._id !== action.payload.commentId
        );
        postCopy.comments = filteredComments;
        return postCopy as PostData;
      };
      return {
        ...state,
        post: removeComment(),
      };

    case 'TOGGLE_LIKE_POST_FROM_DETAIL_POST_PAGE':
      const likePost = () => {
        const user = action.payload;
        const isLiked = post?.likes.find(
          (likeUser) => likeUser._id === user._id
        );
        if (isLiked) {
          const likes = post?.likes.filter(
            (likeUser) => likeUser._id !== user._id
          );
          postCopy.likes = likes;
        } else {
          postCopy.likes!.push(action.payload);
        }
        return postCopy as PostData;
      };
      return {
        ...state,
        post: likePost(),
      };
    case 'ADD_COMMENT_FROM_DETAIL_POST_PAGE':
      const setComment = () => {
        postCopy.comments?.splice(0, 0, action.payload);
        return postCopy as PostData;
      };
      return {
        ...state,
        post: setComment(),
      };
    case 'LIKE_POST_OR_DISLIKE':
      const likeOrDislike = () => {
        const postIndex = findPostIndex(action.payload.postId);
        const isLiked = posts[postIndex].likes.find(
          (user) => user._id === action.payload.user._id
        );
        if (isLiked) {
          const filteredPost = postsCopy[postIndex].likes.filter(
            (user) => user._id !== action.payload.user._id
          );
          postsCopy[postIndex].likes = filteredPost;
        } else {
          postsCopy[postIndex].likes.push(action.payload.user);
        }
        return postsCopy;
      };
      return {
        ...state,
        posts: likeOrDislike(),
      };
    case 'TOGGLE_IS_EDIT':
      const toggleIsEdit = () => {
        const postIndex = findPostIndex(action.payload.postId);
        postsCopy[postIndex].isEdit = !postsCopy[postIndex].isEdit;
        return postsCopy;
      };
      return {
        ...state,
        posts: toggleIsEdit(),
      };
    case 'TOGGLE_IS_COMMENT':
      const toggleComment = () => {
        const postIndex = findPostIndex(action.payload.postId);
        postsCopy[postIndex].isComment = !postsCopy[postIndex].isComment;
        return postsCopy;
      };
      return {
        ...state,
        posts: toggleComment(),
      };
    case 'UPDATE_POST':
      const updatePost = () => {
        const postIndex = findPostIndex(action.payload.postId);
        postsCopy[postIndex].description = action.payload.description;
        return postsCopy;
      };
      return {
        ...state,
        posts: updatePost(),
      };
    case 'DELETE_POST':
      return {
        ...state,
        posts: posts.filter((post) => post._id !== action.payload.postId),
      };
    case 'ADD_COMMENT':
      const addComment = () => {
        const postIndex = findPostIndex(action.payload.postId);
        postsCopy[postIndex].comments.splice(0, 0, action.payload.comment);
        return postsCopy;
      };
      return {
        ...state,
        posts: addComment(),
      };
    case 'TOGGLE_LIKE_COMMENT':
      const likeComment = () => {
        const { commentId, postId, user } = action.payload;
        const postIndex = findPostIndex(postId);
        const commentIndex = findCommentIndex(posts[postIndex], commentId);
        const isLiked = postsCopy[postIndex].comments[commentIndex].likes.find(
          (likeUser) => likeUser._id === user._id
        );
        if (isLiked) {
          const filteredLikes = postsCopy[postIndex].comments[
            commentIndex
          ].likes.filter((likeUser) => likeUser._id !== user._id);
          postsCopy[postIndex].comments[commentIndex].likes = filteredLikes;
        } else {
          postsCopy[postIndex].comments[commentIndex].likes.push(user);
        }
        return postsCopy;
      };
      return {
        ...state,
        posts: likeComment(),
      };
    case 'DELETE_COMMENT':
      const deleteComment = () => {
        const { commentId, postId } = action.payload;
        const postIndex = findPostIndex(postId);
        const filteredComments = posts[postIndex].comments.filter(
          (comment) => comment._id !== commentId
        );
        postsCopy[postIndex].comments = filteredComments;
        return postsCopy;
      };
      return {
        ...state,
        posts: deleteComment(),
      };
    default:
      return state;
  }
}
