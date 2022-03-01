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

  signup(email:string , password: string , firstName: string , lastName: string , phone:string , gender: string , birthDate: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${baseUrl}/auth/register`,
      {email, password , firstName , lastName , phone, gender , birthDate}
    );
  }

  formatUser(data: AuthResponseData) {
    return new User(
      data.token,
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.phone,
      data.gender,
      data.birthDate,
    );

  }

  setUserInLocalStorage(user: User) {
      localStorage.setItem('userData' , JSON.stringify(user));
  }
  getUserFromLocalStorage() {
    return localStorage.getItem('userData');
  }

  logout() {
    localStorage.removeItem('userData');
  }

}
