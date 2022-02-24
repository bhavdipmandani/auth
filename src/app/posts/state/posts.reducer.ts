import { loadPostsSuccess, addPostSuccess, updatePostSuccess, deletePostSuccess, listByIdSuccess } from './posts.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState } from './posts.state';

const _postsReducer = createReducer(
  initialState,
  on(addPostSuccess, (state, action) => {
    let post = {...action.post};

    return {
      ...state,
      posts: [...state.posts, post]
    }
  }),

  on(loadPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts
    }
  }),

  on(updatePostSuccess, (state, action) => {
    const updatePost = state.posts.map((post) => {
      // @ts-ignore
      return action.post._id === post._id ? action.post : post;
    });

    return {
      ...state,
      posts: updatePost
    }
  }),

  on(deletePostSuccess, (state, {_id}) => {
    const deletedPosts = state.posts.filter((post) => {
      return post._id !== _id
    });

    return {
      ...state,
      posts: deletedPosts
    }
  }),

  on(listByIdSuccess, (state, action) => {
    console.log(action.posts)
    return {
      ...state,
      posts: action.posts
    }
  }),

);

export function postsReducer(state, action) {
  return _postsReducer(state, action);
}
