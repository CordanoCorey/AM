import { Component, OnInit, ViewChild } from '@angular/core';
import { SmartComponent, build, HttpActions, truthy } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AccountAdminFormComponent } from './account-admin-form/account-admin-form.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { Account } from '../accounts/accounts.model';
import { accountUrlSelector, accountSelector, AccountActions, accountIdSelector } from '../accounts/accounts.reducer';
import { TabsActions } from '../shared/actions';
import { CurrentUser } from '../shared/models';
import { currentUserSelector } from '../shared/selectors';

@Component({
  selector: 'am-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent extends SmartComponent implements OnInit {

  @ViewChild(AccountAdminFormComponent) accountAdminForm: AccountAdminFormComponent;
  @ViewChild(AccountFormComponent) accountForm: AccountFormComponent;
  account$: Observable<Account>;
  accountId = 0;
  accountId$: Observable<number>;
  accountUrl$: Observable<string>;
  onCancelDest$: Observable<string>;
  onCancelUrl$: Observable<string>;
  routeName = 'account-edit';
  user$: Observable<CurrentUser>;

  constructor(public store: Store<any>) {
    super(store);
    this.accountId$ = accountIdSelector(this.store);
    this.accountUrl$ = this.accountId === 6 ? of('admin') : accountUrlSelector(this.store);
    this.account$ = this.accountId === 6 ? of(new Account()) : accountSelector(this.store);
    this.onCancelDest$ = this.user$.pipe(
      map(user => user.accountLevel === 1 ? 'accounts' : 'dashboard')
    );
    this.onCancelUrl$ = combineLatest(this.accountUrl$, this.onCancelDest$, (url, dest) => `/${url}/${dest}`);
    this.user$ = currentUserSelector(this.store);
  }

  get accountIdChanges(): Subscription {
    return this.accountId$.subscribe(id => {
      this.accountId = id;
    });
  }

  get btnText(): string {
    return this.editMode ? 'Update Account' : 'Add Account';
  }

  get currentAdminId(): number {
    return this.accountAdminForm.valueOut.ownerId;
  }

  get currentValue(): Account {
    return build(Account, this.accountForm.valueOut, { ownerId: this.currentAdminId });
  }

  get editMode(): boolean {
    return this.formMode === 'edit' ? true : false;
  }

  get formMode(): string {
    return this.accountId === 6 ? 'add' : 'edit';
  }

  get heading(): string {
    return this.editMode ? 'Edit Account' : 'Add A New Account';
  }

  get isAdmin(): boolean {
    return this.accountId === 6;
  }

  get isValid(): boolean {
    return this.accountForm.isValid && this.accountAdminForm.isValid;
  }

  get showAdministrators(): boolean {
    return false;
  }

  get showMessage(): boolean {
    return false;
  }

  ngOnInit() {
    this.subscribe([this.accountIdChanges]);
    this.dispatch(TabsActions.activate('accounts'));
  }

  onSave(account: Account) {
    if (account.id === 0) {
      this.addAccount(account);
    } else {
      this.updateAccount(account);
    }
  }

  submit(e: any) {
    this.markAsSubmitted();
    if (this.isValid) {
      if (truthy(this.accountId)) {
        this.updateAccount(this.currentValue);
      } else {
        this.addAccount(this.currentValue);
      }
    }
  }

  markAsSubmitted() {
    this.accountForm.markAsSubmitted();
    this.accountAdminForm.markAsSubmitted();
  }

  getAccount(accountId: number): void {
    this.dispatch(HttpActions.get(`accounts/${accountId}`, AccountActions.GET));
  }

  addAccount(account: Account): void {
    this.dispatch(HttpActions.post(`accounts`, account, AccountActions.POST));
  }

  updateAccount(account: Account): void {
    this.dispatch(HttpActions.put(`accounts/${account.id}`, account, AccountActions.PUT));
  }

}
