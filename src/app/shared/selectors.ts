import { build, Lookup, routeParamSelector } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, distinctUntilChanged, withLatestFrom } from 'rxjs/operators';

import { CurrentUser, User, Users, Profile } from './models';

export function usersSelector(store: Store<any>): Observable<Users> {
    return store.select('users');
}

export function currentUserSelector(store: Store<any>): Observable<CurrentUser> {
    const currentUser$: Observable<CurrentUser> = store.select(x => (<CurrentUser>x['currentUser']));
    const users$ = usersSelector(store);

    return currentUser$.pipe(
        withLatestFrom(users$, (cu: CurrentUser, users: Users) => {
            const activeUser = cu.impersonating ? cu.impersonating : cu;
            const user = users.items[activeUser.id];
            return build(CurrentUser, cu, user);
        }));
}

export function currentUserIdSelector(store: Store<any>): Observable<number> {
    return currentUserSelector(store).pipe(
        map(user => user.id),
        distinctUntilChanged()
    );
}

export function dashboardSelector(store: Store<any>): Observable<Dashboard> {
    return of(new Dashboard());
}

export function dashboardMessageSelector(store: Store<any>): Observable<DashboardMessage> {
    return of(new DashboardMessage());
}

export function filesSelector(store: Store<any>): Observable<Files> {
    return store.select('files');
}

export function lookupAccountStatuses(store: Store<any>): Observable<Lookup> {
    return store.select('lookup').pipe(map(lookup => lookup['AccountStatuses']));
}

export function passwordResetCodeSelector(store: Store<any>): Observable<string> {
    return currentUserSelector(store).pipe(
        map(user => user.passwordResetCode),
        distinctUntilChanged()
    );
}

export function profileSelector(store: Store<any>): Observable<Profile> {
    return currentUserSelector(store).pipe(
        map(user => build(Profile, {
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress,
            userTitle: user.userTitle,
            generalInfo: user.generalInfo,
            warnOnDirty: user.warnOnDirty,
            autoSaveEnabled: user.autoSaveEnabled
        }))
    );
}

export function redirectToSelector(store: Store<any>): Observable<string> {
    return routeParamSelector(store, 'redirectTo', 'dashboard').pipe(
        distinctUntilChanged()
    );
}

export function searchSelector(store: Store<any>): Observable<any> {
    return store.select('search');
}

export function userSelector(store: Store<any>): Observable<User> {
    return usersSelector(store).pipe(
        map(users => users.active || new User()),
        distinctUntilChanged()
    );
}

export function userIdSelector(store: Store<any>, id: number): Observable<User> {
    return usersSelector(store).pipe(
        map(users => users.items[id] || new User()),
        distinctUntilChanged()
    );
}
