import { Post } from '../models/posts.model';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {baseUrl} from "../../environments/environment";
import {map} from "rxjs/operators";
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${baseUrl}/post`);
  }

  addPost(post: Post): Observable<{ name: string , description: string }> {
    return this.http.post<{ name: string  , description: string }>(
      `${baseUrl}/post`,
      post
    );
  }

  getPostById(_id) {
    return this.http
      .get<Post[]>(`${baseUrl}/post/${_id}`)
  }

  deletePost(_id) {
    return this.http.delete(
      `${baseUrl}/post/${_id}`
    );
  }

  // updatePost(post: Post) {
  //   // console.log(post._id)
  //   const postItem = {
  //      [ post._id ] : {title: post.title, description: post.description}
  //   }
  //   return this.http.patch(`${baseUrl}/post/${post._id}` ,
  //     postItem
  //   );
  // }

    updatePost(post: Post) {
    return this.http.patch(`${baseUrl}/post/${post._id}`, {title: post.title, description: post.description})
  }
}
