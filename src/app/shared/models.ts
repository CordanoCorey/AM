export { StorageActions, Action, Config, BaseEntity } from '@caiu/library';
import {
    build,
    Collection,
    Dictionary,
    BaseEntity,
    User as BaseUser,
    CurrentUser as BaseCurrentUser,
    Token
} from '@caiu/library';

export class AccountRequest {
    accountId = 0;
    accountName = '';
    notificationStatus = 'Action Required';
    notificationStatusId = 1;
    notificationType = 'Account Request';
    notificationTypeId = 0;
    reason = '';
    userId = 0;
    userName = '';
}

export class CurrentUser extends BaseCurrentUser {
    id = 0;
    accessFailedCount = 0;
    accountId = 0;
    accountLevel = 0;
    concurrencyStamp = '';
    emailConfirmed = false;
    impersonating: CurrentUser;
    lastPasswordChangedDate: Date = new Date();
    lockoutEnabled = false;
    lockoutEnd: Date = new Date();
    normalizedEmail = '';
    normalizedUserName = '';
    password = '';
    passwordHash = '';
    passwordResetCode = '';
    phoneNumber = '';
    phoneNumberConfirmed = false;
    securityStamp = '';
    serverSalt = '';
    token: Token = new Token();
    twoFactorEnabled = false;
    userId = 0;

    displayMode: DisplayMode = 'default';

    get accountIds(): number[] {
        return this.userAccounts.map(x => x.id);
    }

    get authenticated(): boolean {
        return this.token.expires_in > 0;
    }

    get hasAccount(): boolean {
        return this.accountId === 0 ? true : false;
    }

    get primaryAccountId(): number {
        const account = this.userAccounts.find(x => x.isPrimary === true);
        return account ? account.id : this.userAccounts[0].id;
    }

    logout() {
        this.token = new Token();
    }

}

export class Dashboard {
    greeting = '';
}

export class DashboardMessage extends BaseEntity {
    id = 0;
    description = '';
    lock = '';
    subject = '';
    startDate: Date = new Date();
    endDate: Date = new Date();
}

export type DisplayMode = 'default' | 'classic';

export class File extends BaseEntity {
    id = 0;
    fileName = '';
    fileSize = 0;
    fileBinary: any[] = [];
    fileString = '';
    fileExtension = '';
    mimeType = '';

    static getSrcPrefix(mimeType: string): string {
        return `data:${mimeType};base64,`;
    }

    get src(): string {
        return this.mimeType && this.fileBinary ? `data:${this.mimeType};base64,${this.fileBinary}` : '';
    }

    get srcPrefix(): string {
        return `data:${this.mimeType};base64,`;
    }

    toBinary() {
        return this.mimeType && this.fileBinary ? `data:${this.mimeType};base64,${this.fileBinary}` : '';
    }
}

export class FileUpload {
    lastModified = 0;
    lastModifiedDate: Date = new Date();
    name = '';
    size = 0;
    type = '';
    webkitRelativePath = '';

    order?= 0;
    readyState: 'EMPTY' | 'LOADING' | 'DONE' = 'EMPTY';
    src = '';

    static GetReadyState(reader: FileReader) {
        switch (reader.readyState) {
            case 0:
                return 'EMPTY';
            case 1:
                return 'LOADING';
            case 2:
                return 'DONE';
            default:
                return 'EMPTY';
        }
    }

    get extension(): string {
        return this.name.split('.').pop();
    }

    get isImage(): boolean {
        return this.type.split('/')[0] === 'image';
    }

    get loading(): boolean {
        return this.readyState === 'LOADING';
    }
}

export class Files extends Collection<File> {


    static FileToBinary(f: File) {
        return f.mimeType && f.fileBinary ? `data:${f.mimeType};base64,${f.fileBinary}` : '';
    }

    static MapFileUpload(upload: FileUpload, file?: File) {
        return build(File, {
            fileBinary: upload.src.replace(File.getSrcPrefix(upload.type), ''),
            fileExtension: upload.extension,
            fileName: upload.name,
            fileSize: upload.size,
            mimeType: upload.type,
            id: file ? file.id : 0
        });
    }

    constructor() {
        super(File);
    }

}

export class Profile {
    userId = 0;
    agendaDateRangeId = 10;
    autoSaveEnabled = false;
    emailAddress = '';
    firstName = '';
    generalInfo = '';
    groupId = 0;
    lastName = '';
    userTitle = '';
    warnOnDirty = true;
    newPassword = '';
    confirmPassword = '';
}

export class ResetPassword {
    passwordResetCode = '';
    password = '';
    confirmPassword = '';
}

export class Tab {
    label = '';
    href = '';
    isActive?= false;
    name?= '';
    submenu?: Tab[];

    static Build({ label, href, isActive = false, name = '', submenu = [] }) {
        return build(Tab, { label, href, isActive, name, submenu });
    }
}

export class Tabs extends Collection<Tab> {

    _order: string[] = [];

    static Build(data: Dictionary<Tab>, order?: string[]): Tabs {
        const items = Object.keys(data).map(key => build(Tab, data[key], { name: key }));
        const tabs: Dictionary<Tab> = {};
        items.forEach(item => {
            const key = item.name;
            tabs[key] = item;
        });
        return build(Tabs, tabs, { order });
    }

    constructor() {
        super(Tab);
    }

    get order() {
        return this._order.length > 0 ? this._order : Object.keys(this.items);
    }

    set order(value: string[]) {
        this._order = value;
    }

    label(name: string): string {
        for (let i = 0; i < this.toArray().length; i++) {
            const tab = this.items[i];
            if (tab.name === name) {
                return tab.label;
            }
        }
        return '';
    }
}

export class User extends BaseUser {
    id = 0;
    agendaDateRangeId = 0;
    autoSaveEnabled = false;
    defaultGroupId = 0;
    emailAddress = '';
    failedPasswordAttemptCount = 0;
    firstName = '';
    fullName = '';
    generalInfo = '';
    groupIds: number[] = [];
    impersonating: CurrentUser = undefined;
    isActive = true;
    isLockedOut = false;
    lastLockoutDate: Date = new Date();
    lastLoginDate: Date = new Date();
    lastName = '';
    middleName = '';
    userName = '';
    userTitle = '';
    warnOnDirty = true;

    groups: Group[] = [];
    userAccounts: UserAccount[] = [];
    userGroups: GroupMember[] = [];

    private _userRole = '';

    get userRole(): string {
        return this._userRole;
    }

    set userRole(value: string) {
        this._userRole = value;
    }

    get isAccountActive(): boolean {
        return true;
    }

    isAccountMember(accountId: number) {
        return this.userAccounts.findIndex(account => account.id === accountId) !== -1;
    }

}

export class Users extends Collection<User> {

    constructor() {
        super(User);
    }

}

export class UserSearchResult {

    id = 0;
    firstName = '';
    lastName = '';
    fullName = '';
    user: User = new User();

    static Build(user: User): UserSearchResult {
        return build(UserSearchResult, user, { user });
    }

    get displayName(): string {
        return `${this.lastName}, ${this.firstName}`;
    }
}

export class PrintDoc {

}

export class PdfDoc extends PrintDoc {

}

export class WordDoc extends PrintDoc {

}
