import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'am-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent extends SmartComponent implements OnInit {

  account$: Observable<Account>;
  accounts$: Observable<Collection<Account>>;
  routeName = 'accounts';
  statuses$: Observable<Lookup>;

  constructor(public store: Store<any>) {
    super(store);
    this.account$ = currentAccountSelector(this.store);
    this.accounts$ = accountsSelector(this.store);
    this.statuses$ = this.store.select('lookup').map(lookup => lookup['AccountStatuses']);
  }

  ngOnInit() {
    this.dispatch(TabsActions.activate('account'));
  }

  getAccounts() {
    this.dispatch(HttpActions.get('accounts', AccountsActions.GET));
  }

}
