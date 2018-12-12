import { Component, OnInit } from '@angular/core';
import { SmartComponent, Collection, Lookup, HttpActions } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Accounts, Account } from './accounts.model';
import { accountsSelector, AccountsActions, accountSelector } from './accounts.reducer';
import { TabsActions } from '../shared/actions';

@Component({
  selector: 'am-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent extends SmartComponent implements OnInit {

  account$: Observable<Account>;
  accounts$: Observable<Accounts>;
  routeName = 'accounts';
  statuses$: Observable<Lookup>;

  constructor(public store: Store<any>) {
    super(store);
    this.account$ = accountSelector(this.store);
    this.accounts$ = accountsSelector(this.store);
    this.statuses$ = this.store.select('lookup').pipe(
      map(lookup => lookup['AccountStatuses'])
    );
  }

  ngOnInit() {
    this.dispatch(TabsActions.activate('account'));
  }

  getAccounts() {
    this.dispatch(HttpActions.get('accounts', AccountsActions.GET));
  }

}
