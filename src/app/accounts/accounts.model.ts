import { Collection, Metadata, toInt, build, Dictionary, Action } from '@caiu/library';

import { GroupMember } from '../groups/groups.model';
import { User, File, Files } from '../shared/models';

export class Account {
    id = 0;
    administrator: User = new User();
    allowRequests?= false;
    defaultSignature = '';
    description?= '';
    emailAgendaTemplate = '';
    emailTemplate = '';
    logo: File = new File();
    memberContentSourceId = '';
    name = '';
    ownerId = 0;
    publicContentSourceId = '';
    status = '';
    statusId = 0;
    trialPeriodStartDate: Date = new Date();
    trialPeriodEndDate: Date = new Date();
    url = '';

    get src(): string {
        return Files.FileToBinary(this.logo);
    }

}

export class Accounts extends Collection<Account> {

    activeUrl = '';
    metadata: Metadata = Object.assign(new Metadata(), {
        items: [
            { label: 'Name', name: 'name' },
            { label: 'URL', name: 'url' },
            { label: 'Status', name: 'status' },
        ]
    });

    static FindAccountId(state: Accounts, url: string): number {
        const activeAccount = state.toArray().find(x => x.url === url);
        return activeAccount ? activeAccount.id || toInt(state.activeId) : 0;
    }

    static FindAccountUrl(state: Accounts, id: number | string): string {
        const activeAccount = state.toArray().find(x => x.id === id);
        return activeAccount ? activeAccount.url || state.activeUrl : '';
    }

    static ReduceAccount(state: Accounts, action: Action, accountId: number): Accounts {
        const account = accountReducer(state.get(accountId), action);
        return build(Accounts, state, state.update(account));
    }

    static ReduceAccounts(state: Accounts, payload: Account[]): Accounts {
        const items = payload.reduce((acc: Dictionary<Account>, item: Account) => {
            return Object.assign({}, acc, { [item.id]: item });
        }, Object.assign({}, state.items));
        return build(Accounts, state, { items });
    }

    static ReduceActivate(state: Accounts, id: number | string): Accounts {
        const activeAccount = state.toArray().find(x => x.id === id);
        const activeUrl = activeAccount ? activeAccount.url || state.activeUrl : '';
        return build(Accounts, state, { activeId: id, activeUrl });
    }

    constructor() {
        super(Account);
    }

    get active(): Account {
        return this.items[this.activeId] || new Account();
    }

    findAccountId(url: string): number {
        return Accounts.FindAccountId(this, url);
    }

}

export class AccountMember {
    userId = 0;
    user: User = new User();
    account: Account = new Account();
    accountRole = '';
    accountRoleId = 0;
    groupIds: number[] = [];
    isPrimaryAccount = false;
    isUserActive = false;
    isGroupManager = false;
    isGroupContributor = false;
    role: AccountRole = AccountRole.DEFAULT;
    _accountId = 0;
    _groups: GroupMember[] = [];

    get id(): string {
        return `${this.accountId}_${this.userId}`;
    }

    get accountId(): number {
        return this._accountId || this.account.id;
    }

    set accountId(value: number) {
        this._accountId = value;
    }

    get displayName(): string {
        return `${this.user.lastName}, ${this.user.firstName}`;
    }

    get fullName(): string {
        return this.user.fullName;
    }

    set fullName(value: string) {
        this.user.fullName = value;
    }

    get groups(): GroupMember[] {
        return this._groups;
    }

    set groups(value: GroupMember[]) {
        if (value) {
            this._groups = value;
        }
    }
}

export enum AccountRole {
    DEFAULT = 0,
    SystemAdministrator = 1,
    Administrator = 2,
    GroupAdministrator = 3,
    Member = 4
}

export class AccountRow {

    constructor(public model: Account) {
    }

    get accountName() {
        return this.model.name;
    }

    get accountUrl() {
        return this.model.url;
    }

    get accountStatus() {
        return this.model.status;
    }

}

export enum AccountStatus {
    DEFAULT,
    ACTIVE,
    CLOSED,
    TRIAL
}
