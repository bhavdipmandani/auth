import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {autoLogout} from "../../auth/state/auth.action";
import { isAuthenticated } from '../../auth/state/auth.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated: Observable<boolean>;
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
  }

  onLogout(event: Event){
    event.preventDefault();
    this.store.dispatch(autoLogout());
    this.router.navigate(['/auth/login']);
  }
}
