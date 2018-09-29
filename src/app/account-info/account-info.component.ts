import { Component, OnInit } from '@angular/core';
import { SmartComponent, HttpActions } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Account } from '../accounts/accounts.model';
import { accountUrlSelector, accountSelector, AccountActions, accountIdSelector } from '../accounts/accounts.reducer';
import { TabsActions } from '../shared/actions';

@Component({
  selector: 'am-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent extends SmartComponent implements OnInit {

  account$: Observable<Account>;
  accountId = 0;
  accountId$: Observable<number>;
  accountUrl = '';
  accountUrl$: Observable<string>;
  routeName = 'account-info';

  constructor(public store: Store<any>) {
    super(store);
    this.account$ = accountSelector(this.store);
    this.accountId$ = accountIdSelector(this.store);
    this.accountUrl$ = accountUrlSelector(this.store);
  }

  get accountIdChanges(): Subscription {
    return this.accountId$.subscribe(id => {
      this.accountId = id;
    });
  }

  get accountUrlChanges(): Subscription {
    return this.accountUrl$.subscribe(url => {
      this.accountUrl = url;
    });
  }

  ngOnInit() {
    this.subscribe([this.accountIdChanges, this.accountUrlChanges]);
    this.dispatch(TabsActions.activate('account'));
  }

  getAccount(accountId: number) {
    this.dispatch(HttpActions.get(`accounts/${accountId}`, AccountActions.GET));
  }

  addAccount(account: Account) {
    this.dispatch(HttpActions.post(`accounts`, account, AccountActions.POST));
  }

  updateAccount(account: Account) {
    this.dispatch(HttpActions.put(`accounts/${account.id}`, account, AccountActions.PUT));
  }

}
