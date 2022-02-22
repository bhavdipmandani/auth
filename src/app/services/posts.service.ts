import { Post } from '../models/posts.model';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {baseUrl} from "../../environments/environment";
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

  deletePost(_id) {
    console.log(_id)
    return this.http.delete(
      `${baseUrl}/post/${_id}`
    );
  }

  updatePost(post: Post) {
    const postItem = {
       [ post._id ] : {title: post.title, description: post.description}
    }
    return this.http.patch(`${baseUrl}/post/${post._id}` ,
      postItem
    );
  }
}
