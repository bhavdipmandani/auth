import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {autoLogin, autoLogout, loginStart, loginSuccess, signupStart, signupSuccess} from "./auth.action";
import {catchError, exhaustMap, map, mergeMap, tap} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {createAction, Store} from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { setErrorMessage } from "src/app/store/Shared/shared.actions";
import { of } from "rxjs";

@Injectable()
export class AuthEffect{

  constructor(
    private actions$: Actions ,
    private authService: AuthService ,
    private router: Router,
    private store: Store<AppState>,
    ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(ofType(loginStart) , exhaustMap(action => {
      return this.authService.login(action.email , action.password).pipe(map(data =>
      {
        const user = this.authService.formatUser(data);
        this.authService.setUserInLocalStorage(user);
        return loginSuccess({user, redirect: true});
      }));
    }))
  })


  loginRedirect$ = createEffect(() => {
    return this.actions$.pipe(ofType(loginSuccess) , tap(action  => {
      this.store.dispatch(setErrorMessage({ message: '' }));
      if(action.redirect) {
        this.router.navigate(['/home'])
      }
    }))
  } ,
    {dispatch: false}
    );

  signup$ = createEffect(() => {
    return this.actions$.pipe(ofType(signupStart), exhaustMap(action => {
      return this.authService.signup(action.email , action.password , action.firstName , action.lastName , action.phone , action.gender , action.birthDate).pipe(
        map((data) => {
          const user = this.authService.formatUser(data);
          this.authService.setUserInLocalStorage(user);
          return signupSuccess({ user, redirect: true });
        })
      )
    }));
  })

    // signUp$ = createEffect(() => {
    //   return this.actions$.pipe(
    //     ofType(signupStart),
    //     exhaustMap((action) => {
    //       return this.authService.signup(action.email , action.password  , action.name, action.phone).pipe(
    //         map((data) => {
    //           const user = this.authService.formatUser(data);
    //           return signupSuccess({ user });
    //         }),
    //         catchError((errResp) => {
    //           const errorMessage = this.authService.getErrorMessage(
    //             errResp.error.error.message
    //           );
    //           return of(setErrorMessage({ message: errorMessage }));
    //         })
    //       );
    //     })
    //   );
    // });

 signupRedirect$ = createEffect(() => {
      return this.actions$.pipe(ofType(signupSuccess) , tap(action  => {
        this.store.dispatch(setErrorMessage({ message: '' }));
        if(action.redirect) {
          this.router.navigate(['./home'])
        }
      }))
    } ,
    {dispatch: false}
  );

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user = this.authService.getUserFromLocalStorage();
        // @ts-ignore
        return of(loginSuccess({ user, redirect: false }));
      })
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(ofType(autoLogout) , map(action => {
      this.authService.logout();
      this.router.navigate(['/auth '])
    }))
  } , {
    dispatch: false
  })

}
