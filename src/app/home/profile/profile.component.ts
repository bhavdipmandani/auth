import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import {ProfilePictureService} from "../../services/profile-picture.service";
import {ProfilePicture} from "../../models/profile-picture/profilePicture.model";
// import { Observable } from 'rxjs';
// import { isAuthenticated } from 'src/app/auth/state/auth.selector';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { imageUrl } from "../../../environments/environment";
import {CoverPictureService} from "../../services/cover-picture/cover-picture.service";
import {CoverPicture} from "../../models/cover-picture/coverPicture.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  uploadProfile: FormGroup;
  profilePictures: ProfilePicture[];
  coverPictures: CoverPicture[];
  lastName: string;
  firstName: string;
  coverImage:string;
  email: string;
  profile: string;
  userId: string;
  // isAuthenticated: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private uploadprofileservice: ProfilePictureService ,
    private uploadCoverservice: CoverPictureService ,
    private router: Router ,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.lastName = jwt_decode(localStorage.getItem('userData'));
    this.firstName = jwt_decode(localStorage.getItem('userData'));
    this.email = jwt_decode(localStorage.getItem('userData'));
    this.userId = jwt_decode(localStorage.getItem('userData'));
    // this.isAuthenticated = this.store.select(isAuthenticated);

    this.uploadProfile = this.fb.group({
      profile: [''],
    });

    this.uploadprofileservice.getProfilePicture()
      .subscribe( result => {
        if (this.userId['_id'] == result['data']['userId']) {
          // @ts-ignore
          this.profilePictures = `${imageUrl}/${result['data']['profile']}`;
        } else {
          // @ts-ignore
          this.profilePictures = `https://bootdey.com/img/Content/bg1.jpg`;
        }
      });

    // coverPictures

    this.uploadCoverservice.getCoverPicture()
      .subscribe( result => {
        if (this.userId['_id'] == result['data']['userId']) {
          // @ts-ignore
          this.coverPictures = `${imageUrl}/${result['data']['coverImage']}`;
        } else {
          // @ts-ignore
          this.coverPictures = `https://bootdey.com/img/Content/bg1.jpg`;
        }
      });
  }

  profileImage(event) {
    this.profile = event.target.files[0];
  }
  coverImages(event) {
    this.coverImage = event.target.files[0];
  }

  uploadProfilePicture() {
    console.log(this.profile);
    const formData = new FormData();
    formData.append('profile', this.profile);
    formData.append('userId', this.userId['_id']);
    console.log(formData);
    this.uploadprofileservice.uploadProfilePicture(formData).subscribe((res) => {
          console.log('-------------------' , res);
    });
  }


  uploadCoverPicture() {
    console.log(this.coverImage);
    const formData = new FormData();
    formData.append('coverImage', this.coverImage);
    formData.append('userId', this.userId['_id']);
    console.log(formData);
    this.uploadCoverservice.uploadCoverPicture(formData).subscribe((res) => {
      console.log('-------------------' , res);
    });
  }

}
