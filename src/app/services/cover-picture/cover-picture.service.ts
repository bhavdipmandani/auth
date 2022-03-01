
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import {CoverPicture} from "../../models/cover-picture/coverPicture.model";

@Injectable({
  providedIn: 'root'
})
export class CoverPictureService {
  constructor(private http : HttpClient) { }

  uploadCoverPicture(cover): Observable<CoverPicture> {
    return this.http.post<CoverPicture>(`${baseUrl}/cover` , cover);
  }

  public getCoverPicture() {
    return this.http.get<CoverPicture[]>(`${baseUrl}/cover`);
  }


}
