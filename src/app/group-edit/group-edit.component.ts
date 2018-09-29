import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'am-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent extends SmartComponent implements OnInit {

  accountId = 0;
  accountId$: Observable<number>;
  accountUrl = '';
  accountUrl$: Observable<string>;
  admins$: Observable<AccountMember[]>;
  group$: Observable<Group>;
  groupId = 0;
  groupId$: Observable<number>;
  groupMembers$: Observable<GroupMember[]>;
  lkpOutlines$: Observable<Lookup>;
  routeName = 'group-edit';

  constructor(public store: Store<any>) {
    super(store);
    this.accountId$ = currentAccountIdSelector(this.store);
    this.accountUrl$ = activeAccountUrlSelector(this.store);
    this.group$ = groupSelector(this.store);
    this.groupId$ = routeParamSelector(this.store, 'groupId');
    this.groupMembers$ = groupIdMembersSelector(this.store, this.groupId);
    this.lkpOutlines$ = lookupKeySelector(this.store, 'Outlines');
    this.admins$ = this.accountId === 0 ? Observable.of([]) : accountMemberRolesSelector(this.store, this.accountId, [2, 3]);
  }

  get accountIdChanges(): Subscription {
    return this.accountId$.subscribe(id => {
      this.accountId = toInt(id);
      if (this.accountId) {
        // this.getAccountMembers(this.accountId);
      }
    });
  }

  get groupIdChanges(): Subscription {
    return this.groupId$.subscribe(id => {
      this.groupId = toInt(id);
      if (this.groupId) {
        this.getGroup(this.groupId);
      }
    });
  }

  ngOnInit() {
    this.subscribe([this.accountIdChanges, this.groupIdChanges]);
    this.groupMembers$.subscribe(x => { console.dir(x); });
  }

  activate() {
    this.dispatch(GroupsActions.activate(this.groupId));
  }

  addGroup(group: Group) {
    this.dispatch(HttpActions.post(`groups/${group.id}`, group, GroupsActions.POST));
  }

  deleteGroup(groupId) {
    this.dispatch(HttpActions.delete(`groups/${groupId}`, groupId, GroupActions.DELETE)
    );
  }

  getAccountMembers(accountId: number) {
    this.dispatch(HttpActions.get(`accounts/${accountId}/members`, AccountMembersActions.GET));
  }

  getGroup(groupId: number) {
    this.dispatch(HttpActions.get(`groups/${groupId}`, GroupActions.GET));
  }

  updateGroup(group: Group) {
    this.dispatch(HttpActions.put(`groups/${group.id}`, group, GroupActions.PUT));
  }

}
