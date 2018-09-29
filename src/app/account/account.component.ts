import { Component, OnInit, ViewChild } from '@angular/core';
import { SmartComponent, HttpActions } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Account } from '../accounts/accounts.model';
import { AccountActions, accountSelector } from '../accounts/accounts.reducer';
import { TabsActions } from '../shared/actions';
import { Files } from '../shared/models';

@Component({
  selector: 'am-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends SmartComponent implements OnInit {

  @ViewChild('logo') logo;
  account$: Observable<Account>;
  accountId = 0;
  accountUrl = '';
  description = '';
  routeName = 'account-detail';
  src = '';

  constructor(public store: Store<any>) {
    super(store);
    this.account$ = accountSelector(this.store);
  }

  get accountChanges(): Subscription {
    return this.account$.subscribe(account => {
      this.accountId = account.id;
      this.accountUrl = account.url;
      this.description = account.description;
      this.src = Files.FileToBinary(account.logo);
    });
  }

  get tabsOrder(): string[] {
    return ['dashboard', 'meetings', 'search'];
  }

  ngOnInit() {
    this.dispatch(TabsActions.activate('dashboard', this.tabsOrder));
    this.subscribe([this.accountChanges]);
  }

  getAccount(accountId: number): void {
    this.dispatch(HttpActions.get(`accounts/${accountId}`, AccountActions.GET));
  }

}
