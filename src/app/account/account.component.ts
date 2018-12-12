import { Component, OnInit } from '@angular/core';
import { SmartComponent, HttpActions } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Account } from '../accounts/accounts.model';
import { AccountActions, accountSelector } from '../accounts/accounts.reducer';
import { TabsActions } from '../shared/actions';

@Component({
  selector: 'am-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends SmartComponent implements OnInit {

  account: Account = new Account();
  account$: Observable<Account>;
  routeName = 'account-detail';

  constructor(public store: Store<any>) {
    super(store);
    this.account$ = accountSelector(this.store);
  }

  get accountId(): number {
    return this.account.id;
  }

  get accountChanges(): Subscription {
    return this.account$.subscribe(account => {
      this.account = account;
    });
  }

  ngOnInit() {
    this.dispatch(TabsActions.activate('dashboard', ['dashboard', 'meetings', 'search']));
    this.subscribe([this.accountChanges]);
  }

  getAccount(accountId: number): void {
    this.dispatch(HttpActions.get(`accounts/${accountId}`, AccountActions.GET));
  }

}
