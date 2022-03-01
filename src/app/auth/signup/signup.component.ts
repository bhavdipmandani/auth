import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AuthState} from "../state/auth.state";
import {signupStart} from "../state/auth.action";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // @ts-ignore
  signUpForm: FormGroup;

  constructor(private store :Store<AuthState>) { }

  ngOnInit(): void {

    this.signUpForm = new FormGroup({
      firstName: new FormControl('' , [Validators.required]),
      lastName: new FormControl('' , [Validators.required]),
      email: new FormControl('' , [Validators.required , Validators.email]),
      phone: new FormControl('' , [Validators.required]),
      password: new FormControl('' , [Validators.required]),
      gender: new FormControl('' , [Validators.required]),
      birthDate: new FormControl('' , [Validators.required])
    })
  }

  onSignUpSubmit() {
    if(!this.signUpForm.valid) { return; }

    const firstName = this.signUpForm.value.firstName;
    const lastName = this.signUpForm.value.lastName;
    const email = this.signUpForm.value.email;
    const phone = this.signUpForm.value.phone;
    const password = this.signUpForm.value.password;
    const gender = this.signUpForm.value.gender;
    const birthDate = this.signUpForm.value.birthDate;
    this.store.dispatch(signupStart({firstName , lastName , email, phone, password, gender, birthDate}))
  }

}
