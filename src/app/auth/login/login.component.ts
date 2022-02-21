import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AuthState} from "../state/auth.state";
import {loginStart} from "../state/auth.action";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    // @ts-ignore
  loginForm: FormGroup;

  constructor( private store: Store<AuthState>) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('' , [Validators.required , Validators.email]),
      password: new FormControl('' , [Validators.required])
    })
  }

  onLoginSubmit() {
    const email =this.loginForm.value.email;
    const password =this.loginForm.value.password;

    this.store.dispatch(loginStart({email , password}))
  }

}
