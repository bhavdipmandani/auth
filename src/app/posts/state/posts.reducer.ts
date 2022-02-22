import {
  deletePost,
  updatePost,
  loadPostsSuccess,
  addPostSuccess,
  updatePostSuccess,
  deletePostSuccess,
} from './posts.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState } from './posts.state';

const _postsReducer = createReducer(
  initialState,
 /* on(addPostSuccess, (state, action) => {
    return postsAdapter.addOne(action.post, {
      ...state,
    });
  }),
  on(updatePostSuccess, (state, action) => {
    return postsAdapter.updateOne(action.post, state);
  }),
  on(deletePostSuccess, (state, { _id }) => {
    return postsAdapter.removeOne(_id, state);
  }),*/

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
);

export function postsReducer(state, action) {
  return _postsReducer(state, action);
}
