import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import {EffectsModule} from "@ngrx/effects";
import {HttpClientModule} from "@angular/common/http";
import {AuthEffect} from "./auth/state/auth.effect";
import { StoreModule } from '@ngrx/store';
import {AuthReducer} from "./auth/state/auth.reducer";
import { AuthModule } from './auth/auth.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { appReducer } from './store/app.state';
import { HomeComponent } from './home/home/home.component';
import { ProfileComponent } from './home/profile/profile.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    AuthModule,
    FormsModule,
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    }),
    EffectsModule.forRoot([AuthEffect]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
