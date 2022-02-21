import {  getErrorMessage } from './store/Shared/shared.selector';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { autoLogin } from './auth/state/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ngrx-counter';
  errorMessage: Observable<string>;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.errorMessage = this.store.select(getErrorMessage);
    this.store.dispatch(autoLogin());
  }
}
