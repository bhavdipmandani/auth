import { Post } from '../models/posts.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {baseUrl} from "../../environments/environment";
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${baseUrl}/post`)
      .pipe(
        map((data) => {
          const posts: Post[] = [];
          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }
          return posts;
        })
      );
  }

  addPost(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      `${baseUrl}/post`,
      post
    );
  }

  updatePost(post: Post) {
    const postData = {
      [post.id]: { title: post.title, description: post.description },
    };
    return this.http.patch(
      `${baseUrl}/post`,
      postData
    );
  }

  deletePost(post: Post) {
    console.log(post.id)
    return this.http.delete(
      `${baseUrl}/post/${post.id}`
    );
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(
      `${baseUrl}/post/${id}`
    );
  }
}
