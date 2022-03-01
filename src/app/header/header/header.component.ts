import { isAuthenticated } from '../../auth/state/auth.selector';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import {autoLogout} from "../../auth/state/auth.action";
import {Router} from "@angular/router";
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: Observable<boolean>;
  constructor(private store: Store<AppState>, private router: Router) {}
  lastName: string;
  firstName: string

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
    this.lastName = jwt_decode(localStorage.getItem('userData'));
    this.firstName = jwt_decode(localStorage.getItem('userData'));
  }

  onLogout(event: Event){
    event.preventDefault();
    this.store.dispatch(autoLogout());
    this.router.navigate(['/auth/login']);
  }

}
