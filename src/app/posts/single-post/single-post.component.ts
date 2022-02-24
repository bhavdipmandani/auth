import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Post } from '../../models/posts.model';
import { Component, OnInit } from '@angular/core';
import {PostsService} from "../../services/posts.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  post: Post;

  constructor(private store: Store<AppState> , private postService: PostsService , private route : ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)  => {
      const id = params.get('id')
      this.postService.getPostById(id).subscribe((data) => {
        // @ts-ignore
        this.post = data;
      })
    })
  }
}
