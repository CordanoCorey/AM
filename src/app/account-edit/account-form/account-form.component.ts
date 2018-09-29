import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormComponent, Control } from '@caiu/library';

import { AccountEdit } from '../account-edit.model';
import { Account } from '../../accounts/accounts.model';

@Component({
  selector: 'am-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountFormComponent extends FormComponent {

  @Input() account: Account = new Account();
  @Output() add = new EventEmitter<Account>();
  @Output() update = new EventEmitter<Account>();
  @Control(AccountEdit) form: FormGroup;
  modelKey = 'account';
  modelChanges = ['id', 'name', 'statusId', 'url'];

  constructor() {
    super();
  }

  get valueOut(): Account {
    return AccountEdit.BuildAccount(this.account, this.form.value);
  }

  get model(): AccountEdit {
    return new AccountEdit(this.account);
  }

  onSubmit(e: any) {
    if (this.editing) {
      this.add.emit(this.valueOut)
    } else {
      this.update.emit(this.valueOut);
    }
  }

}
