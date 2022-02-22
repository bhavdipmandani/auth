import { AppState } from '../../store/app.state';
import { getPosts } from './posts.selector';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Post } from '../../models/posts.model';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from './posts.actions';
import { PostsService } from '../../services/posts.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { dummyAction } from 'src/app/auth/state/auth.action';

@Injectable()
export class PostsEffects {
  constructor( private actions$: Actions, private postsService: PostsService, private store: Store<AppState> ) { }

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      withLatestFrom(this.store.select(getPosts)),
      mergeMap(([action, posts]) => {
          return this.postsService.getPosts().pipe(
            map((posts) => {
              return loadPostsSuccess({ posts });
            })
          );
        return of(dummyAction());
      })
    );
  });

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map((data) => {
            const post = { ...action.post, _id: data.name };
            return addPostSuccess({ post });
          })
        );
      })
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost),
      switchMap((action) => {
        return this.postsService.deletePost(action._id).pipe(
          map((data) => {
            return deletePostSuccess({ _id: action._id });
          })
        );
      })
    );
  });

  // updatePost$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(updatePost),
  //     switchMap((action) => {
  //       return this.postsService.updatePost(action.post).pipe(
  //         map((data) => {
  //           const updatedPost: Update<Post> = {
  //             id: action.post._id,
  //             changes: {
  //               ...action.post,
  //             },
  //           };
  //           return updatePostSuccess({ post: updatedPost });
  //         })
  //       );
  //     })
  //   );
  // });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePost),
      switchMap((action) => {
        return this.postsService.updatePost(action.post).pipe(
          map((data) => {
            console.log(data);
            const updatedPost: Update<Post> = {
              id: action.post._id,
              changes: {
                ...action.post,
              },
            };
            return updatePostSuccess({ post : action.post });
          })
        );
      })
    );
  });
}
