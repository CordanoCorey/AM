import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AccountRequest, CurrentUser } from '../../shared/models';

@Component({
  selector: 'am-user-accounts',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.scss']
})
export class UserAccountsComponent implements OnInit {

  @Input() accounts: Account[] = [];
  @Input() user: CurrentUser = new CurrentUser();
  @Output() joinAccount: EventEmitter<AccountRequest> = new EventEmitter<AccountRequest>();
  showJoinAccount: 'show' | 'hide' = 'hide';

  constructor() { }

  get primaryAccount(): Account {
    return this.accounts.find(account => account.id === this.user.primaryAccountId);
  }

  get showJoinAccountDisplay(): string {
    return this.showJoinAccount === 'show' ? 'block' : 'none';
  }

  get joinAccountText(): string {
    return this.showJoinAccount === 'show' ? 'Cancel' : 'Join A New Account';
  }

  ngOnInit() {
  }

  onJoinAccount(request: AccountRequest) {
    this.joinAccount.emit(request);
  }

  toggleJoinAccount() {
    this.showJoinAccount = this.showJoinAccount === 'show' ? 'hide' : 'show';
  }

}
