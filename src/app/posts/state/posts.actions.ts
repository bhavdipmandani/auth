import {Post} from '../../models/posts.model';
import { createAction, props } from '@ngrx/store';
export const ADD_POST_ACTION = '[posts page] add post';
export const ADD_POST_SUCCESS = '[posts page] add post success';
export const UPDATE_POST_ACTION = '[posts page] update post';
export const UPDATE_POST_SUCCESS = '[posts page] update post success';
export const DELETE_POST_ACTION = '[posts page] delete post';
export const DELETE_POST_SUCCESS = '[posts page] delete post success';
export const LOAD_POSTS = '[posts page] load posts';
export const LOAD_POSTS_SUCCESS = '[posts page] load posts success';
export const LOAD_POSTS_BY_ID = '[posts page] load posts by id';
export const LOAD_POSTS_BY_ID_SUCCESS = '[posts page] load posts by id success';

export const addPost = createAction(
  ADD_POST_ACTION,
  props<{ post: Post }>()
);

export const addPostSuccess = createAction(
  ADD_POST_SUCCESS,
  props<{ post: Post }>()
);

export const updatePost = createAction(
  UPDATE_POST_ACTION,
  props<{ post: Post }>()
);

export const updatePostSuccess = createAction(
  UPDATE_POST_SUCCESS,
  props<{ post: Post }>()
);

export const listById = createAction(
  LOAD_POSTS_BY_ID
);

export const listByIdSuccess = createAction(
  LOAD_POSTS_BY_ID_SUCCESS,
  props<{ posts: Post[] }>()

);

export const deletePost = createAction(
  DELETE_POST_ACTION,
  props<{ _id: string }>()
);

export const deletePostSuccess = createAction(
    DELETE_POST_SUCCESS,
  props<{ _id: string }>()
);

export const loadPosts = createAction(
  LOAD_POSTS
);

export const loadPostsSuccess = createAction(
  LOAD_POSTS_SUCCESS,
  props<{ posts: Post[] }>()
);
