import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import {ProfilePicture} from "../models/profile-picture/profilePicture.model";
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilePictureService {
  constructor(private http : HttpClient) { }

  uploadProfilePicture(profile): Observable<ProfilePicture> {
    return this.http.post<ProfilePicture>(`${baseUrl}/profile` , profile);
  }

  public getProfilePicture() {
    return this.http.get<ProfilePicture[]>(`${baseUrl}/profile`);
  }


}
