import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import { LoginComponent } from './login/login.component';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
// import {AUTH_STATE_NAME} from "./state/auth.selector";
// import {AuthReducer} from "./state/auth.reducer";
// import {HttpClientModule} from "@angular/common/http";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffect} from "./state/auth.effect";
import { SignupComponent } from './signup/signup.component';
import { AUTH_STATE_NAME } from './state/auth.selector';
import { AuthReducer } from './state/auth.reducer';

const routes: Routes = [
  {
    path: '' ,
    children: [
      {path: '' , redirectTo: 'login' ,pathMatch: 'full' },
      {path: 'login' , component: LoginComponent},
      { path: 'signup', component: SignupComponent },
    ],
  }
]

@NgModule({
  declarations:[
    LoginComponent,
    SignupComponent
  ],
  imports:[
    CommonModule ,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    EffectsModule.forFeature(),
    // EffectsModule.forFeature([AuthEffect]),
    // HttpClientModule,
    StoreModule.forFeature(AUTH_STATE_NAME , AuthReducer)
  ]
})
export class AuthModule {

}
