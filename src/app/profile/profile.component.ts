import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'am-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends SmartComponent implements OnInit {

  account$: Observable<Account>;
  accountId$: Observable<number>;
  accountName$: Observable<string>;
  accounts$: Observable<Account[]>;
  accountUrl$: Observable<string>;
  groups$: Observable<GroupMember[]>;
  lookupDateRanges$: Observable<Lookup>;
  lookupNotificationTypes$: Observable<LookupValue>;
  notificationTypeId$: Observable<number>;
  profile$: Observable<Profile>;
  routeName = 'profile';
  userGroups$: Observable<GroupMember[]>;
  user$: Observable<CurrentUser>;
  userId = 0;
  userId$: Observable<number>;

  constructor(public store: Store<any>) {
    super(store);
    this.account$ = currentAccountSelector(this.store);
    this.accountId$ = currentAccountIdSelector(this.store);
    this.accountName$ = accountNameSelector(this.store);
    this.accounts$ = accountsSelector(this.store).map(accounts => accounts.toArray());
    this.accountUrl$ = activeAccountUrlSelector(this.store);
    this.lookupDateRanges$ = lookupKeySelector(this.store, 'DateRanges');
    this.profile$ = profileSelector(this.store);
    this.user$ = currentUserSelector(this.store);
    this.userId$ = currentUserIdSelector(this.store);
    this.groups$ = Observable.combineLatest(this.accountId$, this.userGroups$,
      (accountId, groups) => groups.filter(g => g.group.accountId === accountId));
    this.lookupNotificationTypes$ = this.lookupNotificationTypes$.map(types => types.value
      .find(x => x.name === 'Account Request') || new LookupValue());
    this.notificationTypeId$ = this.lookupNotificationTypes$.map(x => x.id);
    this.userGroups$ = userGroupsSelector(this.store).map(members => {
      return members.reduce((acc, member) => [...acc, ...member.groups], []);
    });
  }

  get userIdChanges(): Subscription {
    return this.userId$.subscribe(id => {
      this.userId = id;
      this.getUserGroups(this.userId);
      this.getProfile();
    });
  }

  ngOnInit() {
    this.subscribe([this.userIdChanges]);
  }

  addAccountRequest(request: AccountRequest) {
    this.dispatch(HttpActions.post(`accountrequests`, request, NotificationsActions.ADD_ACCOUNT_REQUEST));
  }

  getProfile() {
    this.dispatch(HttpActions.get(`profile`, UserActions.GET_PROFILE));
  }

  getUserGroups(userId: number) {
    this.dispatch(HttpActions.get(`users/${userId}/groups`, GroupsActions.GET_USER_GROUPS));
  }

  updateProfile(profile: Profile) {
    this.dispatch(HttpActions.put(`profile`, profile, UserActions.UPDATE_PROFILE));
  }

}
