import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {baseUrl} from "../../environments/environment";
import {AuthResponseData} from "../models/AuthResponseData.model";
import {Observable} from "rxjs";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(email:string , password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${baseUrl}/auth/login` ,
      {email, password}
      );
  }

  signup(email:string , password: string , name: string , phone:string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${baseUrl}/auth/register` ,
      {email, password , name , phone}
    );
  }

  formatUser(data: AuthResponseData) {

    return new User(
      data.token,
    );
  }

  setUserInLocalStorage(user: User) {
      localStorage.setItem('userData' , JSON.stringify(user));
  }
  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      console.log(userData.email);
      return new User(
        userData.email,
      );
    }
    return null;
  }

  logout() {
    localStorage.removeItem('userData');
  }

}
