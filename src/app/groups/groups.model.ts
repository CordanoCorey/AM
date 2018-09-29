import { Collection, inArray, build, BaseEntity, Dictionary } from '@caiu/library';

import { User } from '../shared/models';

export class Group extends BaseEntity {
    id = 0;
    accountId = 0;
    administratorId = 0;
    allowSuggestions = false;
    description = '';
    name = '';
    outlineId = 1;
    _memberCount = 0;

    administrators: GroupMember[] = [];
    createdByName = '';
    managers: GroupMember[] = [];
    members: GroupMember[] = [];

    get memberCount(): number {
        return this._memberCount || this.members.length;
    }

    set memberCount(value: number) {
        this._memberCount = value;
    }

    get users(): Dictionary<number[]> {
        return this.members.reduce((acc, member) => {
            const roles = acc[member.userId] || [];
            return Object.assign({}, acc, { [member.userId]: [...roles, member.groupRoleId].sort() });
        }, {});
    }

}

export class Groups extends Collection<Group> {

    constructor() {
        super(Group);
    }

}

export class GroupMemberRoles {

    roles: GroupRole[] = [];
    user: User = new User();
    group: Group = new Group();

    get isAttendanceTaker(): boolean {
        return inArray(this.roles, GroupRole.ATTENDANCE_TAKER);
    }

    get isContributor(): boolean {
        return inArray(this.roles, GroupRole.CONTRIBUTOR);
    }

    get isManager(): boolean {
        return inArray(this.roles, GroupRole.MANAGER);
    }

    get isMember(): boolean {
        return inArray(this.roles, GroupRole.MEMBER);
    }

    get isMinuteTaker(): boolean {
        return inArray(this.roles, GroupRole.MINUTE_TAKER);
    }

    get isVoter(): boolean {
        return inArray(this.roles, GroupRole.VOTER);
    }

    get isVoteTaker(): boolean {
        return inArray(this.roles, GroupRole.VOTE_TAKER);
    }

}

export class GroupMember {
    accountId = 0;
    group: Group = new Group();
    groupId = 0;
    groupRole = '';
    groupRoleId = 0;
    user: User = new User();

    get id(): string {
        return `${this.groupId}_${this.userId}_${this.groupRoleId}`;
    }

    get emailAddress(): string {
        return this.user.email;
    }

    set emailAddress(value: string) {
        this.user.email = value;
    }

    get fullName(): string {
        return this.user ? this.user.fullName : '';
    }

    set fullName(value: string) {
        this.user.fullName = value;
    }

    get lastName(): string {
        return this.user ? this.user.lastName : '';
    }

    set lastName(value: string) {
        this.user.lastName = value;
    }

    get memberId(): string {
        return `${this.accountId}_${this.userId}`;
    }

    get name(): string {
        return this.user.fullName;
    }

    get userId(): number {
        return this.user ? this.user.id : 0;
    }

    set userId(value: number) {
        if (this.user) {
            this.user.id = value;
        } else {
            this.user = build(User, { id: value });
        }
    }

}

export class GroupMemberRole {
    role: GroupRole;
    user: User = new User();
    group: Group = new Group();
}

export enum GroupRole {
    DEFAULT,
    MANAGER,
    CONTRIBUTOR,
    MEMBER,
    ATTENDANCE_TAKER,
    MINUTE_TAKER,
    VOTE_TAKER,
    VOTER
}

export enum Outlines {
    DEFAULT,
    NUMBER_LETTER,
    NUMBER_NUMBER
}

export class GroupRow {

    constructor(private _group: Group, private _accountUrl: string) {
    }

    get accountUrl() {
        return this._accountUrl;
    }

    get group(): Group {
        return build(Group, this._group);
    }

    get groupId(): number {
        return this.group.id;
    }

    get groupLink(): string {
        return `/${this.accountUrl}/groups/${this.groupId}/edit`;
    }

    get groupName(): string {
        return this.group.name;
    }

    get members(): number {
        return this.group.memberCount;
    }

    get createdBy(): string {
        return this.group.createdByName;
    }

}

export class GroupEdit {
    groupName = '';
    groupDescription = '';
    allowSuggestions = false;
    outlineId = 1;
    groupAdminId = 0;
    groupMembers: GroupMember[] = [];
    metadata: Metadata = {
        ignore: ['_group', 'group'],
        groupName: {
            validators: [Validators.required, Validators.maxLength(150)]
        }
    };

    static Build(group: Group, props: any = {}): GroupEdit {
        return Object.assign(new GroupEdit(group), props);
    }

    static BuildGroup(group: Group, props: any = {}): Group {
        return GroupEdit.Build(group, props).group;
    }

    constructor(private _group: Group = new Group()) {
        this.groupName = this._group.name;
        this.groupDescription = this._group.description;
        this.allowSuggestions = this._group.allowSuggestions;
        this.outlineId = this._group.outlineId;
        this.groupAdminId = this._group.administratorId;
        this.groupMembers = this._group.members;
    }

    get group(): Group {
        return build(Group, this._group, {
            name: this.groupName,
            description: this.groupDescription,
            allowSuggestions: this.allowSuggestions,
            outlineId: this.outlineId,
            administratorId: this.groupAdminId,
            members: this.groupMembers
        });
    }
}

export class GroupMemberEdit {
    emailAddress = '';
    groupId = 0;
    lastName = '';
    userId = 0;
    userName = '';
    isMember = false;
    isContributor = false;
    isManager = false;
    isVoter = false;
    isVoteTaker = false;
    isMinuteTaker = false;
    isAttendanceTaker = false;
    metadata: Metadata = {
        ignore: ['_members', 'members', 'hasRole', 'inGroup', 'roleIds', 'roles', 'addRole']
    };

    constructor(private _members: GroupMember[] = []) {
        this.groupId = _members[0] ? _members[0].groupId : 0;
        this.userId = _members[0] ? _members[0].userId : 0;
        this.emailAddress = _members[0] ? _members[0].emailAddress : '';
        this.userId = _members[0] ? _members[0].userId : 0;
        this.userName = _members[0] ? _members[0].fullName : '';
        this.lastName = _members[0] ? _members[0].lastName : '';
        _members.forEach(x => this.addRole(x.groupRoleId));
    }

    get inGroup(): boolean {
        return this.roleIds && this.roleIds[0] !== 0;
    }

    get members(): GroupMember[] {
        return this.roleIds.map(id => build(GroupMember, {
            groupId: this.groupId,
            groupRoleId: id,
            userId: this.userId
        }));
    }

    get roleIds(): number[] {
        return Object.keys(this.roles).reduce((acc, key) => this.roles[key] ? [...acc, key] : acc, []);
    }

    get roles(): any {
        return {
            1: this.isManager,
            2: this.isContributor,
            3: this.isMember,
            4: this.isAttendanceTaker,
            5: this.isMinuteTaker,
            6: this.isVoteTaker,
            7: this.isVoter
        };
    }

    addRole(roleId: number) {
        switch (roleId) {
            case 1:
                this.isManager = true;
                break;
            case 2:
                this.isContributor = true;
                break;
            case 3:
                this.isMember = true;
                break;
            case 4:
                this.isAttendanceTaker = true;
                break;
            case 5:
                this.isMinuteTaker = true;
                break;
            case 6:
                this.isVoteTaker = true;
                break;
            case 7:
                this.isVoter = true;
                break;
        }
    }

    hasRole(roleId: number) {
        return inArray(this.roleIds, roleId);
    }
}
