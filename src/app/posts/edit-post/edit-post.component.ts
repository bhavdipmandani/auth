import { updatePost } from '../state/posts.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../../models/posts.model';
import { getPostById } from '../state/posts.selector';
import { AppState } from '../../store/app.state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  post: Post;
  postForm: FormGroup;
  postSubscription: Subscription;


  isUpdateActivated = false;
  constructor(private store: Store<AppState>, private router: Router , private route : ActivatedRoute, private postService: PostsService) {}

  ngOnInit(): void {
    this.createForm();
      this.route.paramMap.subscribe((params)  => {
        const id = params.get('id')
        console.log(id);
        this.postService.getPostById(id).subscribe((data) => {
          // console.log(data);
          // @ts-ignore
          this.post = data;
          this.createForm();
          console.log(this.post.title)
        })
      })

    // @ts-ignore
    // this.store.select(getPostById).subscribe((post) => {
    //   // console.log(post)
    //   if (post) {
    //     this.post = post;
    //     this.postForm.patchValue({
    //       title: post.title,
    //       description: post.description,
    //     });
    //   }
    // });
  }

  createForm () {
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onSubmit() {
    if (!this.postForm.valid) {
      return;
    }
    // console.log(this.postForm.value)
    const title = this.postForm.value.title;
    const description = this.postForm.value.description;
    const post: Post = {
      _id: this.post._id,
      title,
      description,
    };

    this.store.dispatch(updatePost({ post }));
    this.router.navigate(['/posts']);
  }

  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
