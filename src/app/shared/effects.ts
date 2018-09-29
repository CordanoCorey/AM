import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { RouterActions, Action } from '@caiu/library';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CurrentUserActions } from './actions';

@Injectable()
export class CurrentUserEffects {

    /**
     * Navigate to root url upon successful login.
     */
    @Effect() onLoginSuccess: Observable<Action> = this.actions$.pipe(
        ofType(CurrentUserActions.LOGIN),
        map(action => this.redirectAfterLogin())
    );

    /**
     * Navigate to login page after logging out.
     */
    @Effect() onLogout: Observable<Action> = this.actions$.pipe(
        ofType(CurrentUserActions.LOGOUT),
        map(action => RouterActions.navigate('/login'))
    );

    /**
     * Navigate to root url upon successful password reset.
     */
    @Effect() onResetPassword: Observable<Action> = this.actions$.pipe(
        ofType(CurrentUserActions.RESET_PASSWORD),
        map(action => RouterActions.navigate('/'))
    );

    redirectTo = '';
    redirectTo$: Observable<string>;

    constructor(private actions$: Actions, public store: Store<any>) {
        this.redirectTo$ = redirectToSelector(store);
        this.redirectTo$.subscribe(x => {
            this.redirectTo = x;
        });
    }

    redirectAfterLogin(): Action {
        return RouterActions.navigate(this.redirectTo);
    }

}