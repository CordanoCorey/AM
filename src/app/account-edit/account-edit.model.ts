import { Validators } from '@angular/forms';
import { build } from '@caiu/library';

import { Account } from '../accounts/accounts.model';
import { User } from '../shared/models';

export class EditAccountPayload {
    accountName = '';
    url = '';
    status = '';
}

export class AccountEdit {

    id = 0;
    accountName = '';
    statusId = '';
    url = '';
    metadata = {
        ignore: ['_account', 'account', 'id'],
        accountName: {
            validators: [Validators.required, Validators.maxLength(75)]
        },
        statusId: {
            validators: [Validators.required]
        },
        url: {
            validators: [Validators.required, Validators.maxLength(50)]
        }
    };

    static Build(account: Account, props: any = {}): AccountEdit {
        return Object.assign(new AccountEdit(account), props);
    }

    static BuildAccount(account: Account, props: any = {}): Account {
        return AccountEdit.Build(account, props).account;
    }

    constructor(private _account: Account = new Account()) {
        this.accountName = this._account.name;
        this.statusId = this._account.statusId.toString() || '3';
        this.url = this._account.url;
        this.id = this._account.id;
    }

    get account(): Account {
        return build(Account, this._account, {
            name: this.accountName,
            statusId: this.statusId,
            url: this.url
        });
    }
}

export class AccountAdmin {

    id = 0;
    emailAddress = '';
    firstName = '';
    lastName = '';
    title = '';
    useExisting = false;
    ownerId = 0;
    ownerInput = '';
    metadata = {
        ignore: ['_account', 'account', 'user', 'id'],
        ownerId: {
            validators: [Validators.required]
        }
    };

    static Build(account: Account, props: any = {}): AccountAdmin {
        return Object.assign(new AccountAdmin(account), props);
    }

    static BuildAccount(account: Account, props: any = {}): Account {
        return AccountAdmin.Build(account, props).account;
    }

    constructor(private _account: Account = new Account()) {
        this.emailAddress = this.user.emailAddress;
        this.firstName = this.user.firstName;
        this.lastName = this.user.lastName;
        this.title = this.user.userTitle;
        this.ownerId = this._account.ownerId;
        this.id = this._account.id;
    }

    get account(): Account {
        return build(Account, this._account, {
            ownerId: this.ownerId,
            administrator: build(User, this.user, {
                emailAddress: this.emailAddress,
                firstName: this.firstName,
                lastName: this.lastName,
                userTitle: this.title
            })
        });
    }

    get user(): User {
        return this._account.administrator ? this._account.administrator : new User();
    }

}
