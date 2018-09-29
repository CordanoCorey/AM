import { build } from '@caiu/library';

import { Account } from '../accounts/accounts.model';
import { FileUpload, Files } from '../shared/models';

export class AccountInfo {
    id = 0;
    accountName = '';
    allowAccountRequests = false;
    description = '';
    logo: FileUpload[] = [];
    removeLogo = false;
    signature = '';
    metadata = {
        ignore: ['_account', 'account', 'id']
    };

    static Build(account: Account, props: any = {}): AccountInfo {
        return Object.assign(new AccountInfo(account), props);
    }

    static BuildAccount(account: Account, props: any = {}): Account {
        return AccountInfo.Build(account, props).account;
    }

    constructor(private _account: Account = new Account()) {
        this.accountName = this._account.name;
        this.allowAccountRequests = this._account.allowRequests;
        this.description = this._account.description;
        this.signature = this._account.defaultSignature;
        this.id = this._account.id;
    }

    get account(): Account {
        return build(Account, this._account, {
            name: this.accountName,
            allowRequests: this.allowAccountRequests,
            description: this.description,
            logo: this.removeLogo ? (Files.MapFileUpload(this.logo[0], this._account.logo) || null) : this._account.logo,
            defaultSignature: this.signature
        });
    }

    setValue(props: any): AccountInfo {
        return Object.assign(this, props);
    }

}
