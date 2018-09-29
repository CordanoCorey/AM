import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormComponent, Control } from '@caiu/library';

import { AccountInfo } from '../account-info.model';
import { Account } from '../../accounts/accounts.model';

@Component({
  selector: 'am-account-info-form',
  templateUrl: './account-info-form.component.html',
  styleUrls: ['./account-info-form.component.scss']
})
export class AccountInfoFormComponent extends FormComponent {

  @Input() account: Account = new Account();
  @Input() accountUrl = '';
  @Output() add: EventEmitter<Account> = new EventEmitter<Account>();
  @Output() update: EventEmitter<Account> = new EventEmitter<Account>();
  @Control(AccountInfo) form: FormGroup;
  modelKey = 'account';
  modelChanges = ['id', 'name', 'description', 'signature', 'logo'];

  constructor() {
    super();
  }

  get cancelLink(): string {
    return this.accountUrl === 'admin' ? `/admin/accounts` : `/${this.accountUrl}/dashboard`;
  }

  get model(): AccountInfo {
    return new AccountInfo(this.account);
  }

  get valueOut(): Account {
    return AccountInfo.BuildAccount(this.account, this.form.value);
  }

  onSubmit(e: any) {
    e.preventDefault();
    this.editing ? this.add.emit(this.valueOut) : this.update.emit(this.valueOut);
  }

}
