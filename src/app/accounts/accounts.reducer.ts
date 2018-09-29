import { build, Action, toInt, routeParamSelector } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { Accounts, AccountMember, Account } from './accounts.model';
import { AccountMembersActions } from '../members/members.reducer';
import { AppActions, UserActions } from '../shared/actions';
import { currentUserSelector } from '../shared/selectors';

export class AccountsActions {
    static ACTIVATE = '[Accounts] Activate';
    static ACTIVATE_ID = '[Accounts] Activate ID';
    static ACTIVATE_URL = '[Accounts] Activate URL';
    static ACTIVATE_AND_REDIRECT = '[Accounts] Activate and Redirect';
    static GET = '[Accounts] Get';
    static POST = '[Accounts] Post';
    static PUT = '[Accounts] Put';

    static activate(account: Account): Action {
        return {
            type: AccountsActions.ACTIVATE,
            payload: account
        };
    }

    static activateId(id: number): Action {
        return {
            type: AccountsActions.ACTIVATE_ID,
            payload: id
        };
    }

    static activateRedirect(account: Account): Action {
        return {
            type: AccountsActions.ACTIVATE_AND_REDIRECT,
            payload: account
        };
    }

    static activateUrl(url: string): Action {
        return {
            type: AccountsActions.ACTIVATE_URL,
            payload: url
        };
    }

}

export class AccountActions {
    static ACTIVATE = '[Account] Set Active Account';
    static ADD_ACCOUNT_LOGO = '[Account] Add Account Member';
    static GET = '[Account] Get';
    static GET_ACCOUNT_LOGO = '[Account] Get Account Logo';
    static POST = '[Account] Post';
    static PUT = '[Account] Put';
}

export function accountsReducer(state: Accounts = new Accounts(), action: Action): Accounts {
    // console.log(`\n\nAction Type:\t${action.type}`, `\nActive Account ID:\t${state.activeId}`);
    switch (action.type) {

        case AppActions.INIT_STORE:
            return build(Accounts, action.payload['accounts']);

        case AccountsActions.ACTIVATE:
            return build(Accounts, state, { activeId: action.payload.id });

        case AccountsActions.ACTIVATE_AND_REDIRECT:
            return build(Accounts, state, { activeId: action.payload.id, activeUrl: Accounts.FindAccountUrl(state, action.payload.id) });

        case AccountsActions.ACTIVATE_URL:
            return build(Accounts, state, { activeId: Accounts.FindAccountId(state, action.payload), activeUrl: action.payload });

        case AccountsActions.GET:
            return build(Accounts, state.update(<Account[]>action.payload), {
                activeId: state.activeId ? state.activeId : state.activeUrl ? Accounts.FindAccountId(state, state.activeUrl) : 0,
                accountUrl: state.activeUrl ? state.activeUrl : state.activeId ? Accounts.FindAccountUrl(state, state.activeId) : ''
            });

        case AccountActions.GET:
            return build(Accounts, state.update(<Account>action.payload));

        case AccountsActions.POST:
            return build(Accounts, state.update(<Account>action.payload));

        case AccountActions.PUT:
            return build(Accounts, state.update(<Account>action.payload));

        case UserActions.LOGIN_SUCCESS:
            const accounts = action.payload.user.userAccounts;
            return accounts.length === 1 ? Accounts.ReduceActivate(state, accounts[0].id) : state;

        case UserActions.LOGOUT:
            return build(Accounts, state, { activeId: 0 });

        case AccountMembersActions.GET:
            const member = (<AccountMember[]>action.payload.results)[0] || new AccountMember();
            const accountId = member.accountId;
            return Accounts.ReduceAccount(state, action, accountId);

        default:
            return state;
    }
}

export function accountsSelector(store: Store<any>): Observable<Accounts> {
    return store.select('accounts');
}

export function activeAccountIdSelector(store: Store<any>): Observable<number> {
    return accountsSelector(store).pipe(
        map(accounts => toInt(accounts.activeId)),
        distinctUntilChanged()
    );
}

export function accountIdSelector(store: Store<any>): Observable<number> {
    return accountSelector(store).pipe(
        map(x => x.id),
        distinctUntilChanged()
    );
}

export function accountUrlSelector(store: Store<any>): Observable<string> {
    return routeParamSelector(store, 'account');
}

export function userAccountsSelector(store: Store<any>): Observable<AccountMember[]> {
    const user$ = currentUserSelector(store);
    const accounts$ = accountsSelector(store);

    return combineLatest(user$, accounts$, (user, accounts) => {
        const userAccounts = user.userAccounts || [];
        return userAccounts.map((userAccount: UserAccount) => {
            return build(AccountMember,
                {
                    account: accounts.items[userAccount.id],
                    userId: user.id,
                    isPrimary: userAccount.isPrimary
                });
        });
    });
}

export function accountSelector(store: Store<any>): Observable<Account> {
    return combineLatest(accountsSelector(store), accountUrlSelector(store),
        (accounts, url) => build(Account, accounts.asArray.find(x => x.url === url)));
}
