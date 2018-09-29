import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'am-meetings-widget',
  templateUrl: './meetings-widget.component.html',
  styleUrls: ['./meetings-widget.component.scss']
})
export class MeetingsWidgetComponent extends SmartComponent implements OnInit {

  account$: Observable<Account>;
  accountId = 0;
  accountId$: Observable<number>;
  accountUrl$: Observable<string>;
  dateRanges$: Observable<Lookup>;
  groups$: Observable<Group[]>;
  meetings$: Observable<Meeting[]>;
  search: MeetingsSearch = new MeetingsSearch();

  constructor(public store: Store<any>) {
    super(store);
    this.account$ = currentAccountSelector(this.store);
    this.accountId$ = currentAccountIdSelector(this.store);
    this.accountUrl$ = activeAccountUrlSelector(this.store);
    this.dateRanges$ = lookupKeySelector(this.store, 'DateRanges');
    this.groups$ = this.accountId$.mergeMap(id => accountGroupsSelector(this.store, id));
    this.meetings$ = meetingsSelector(this.store).map(meetings => meetings.query(this.path));
  }

  get accountIdChanges(): Subscription {
    return this.accountId$.subscribe(id => {
      this.accountId = id;
      this.getMeetings();
      this.getAccountGroups(this.accountId);
    });
  }

  get endDate(): Date {
    return this.search.dateRange.endDate;
  }

  get groupId(): number {
    return this.search.groupId;
  }

  get path(): string {
    let path = `meetings?accountId=${this.accountId}&startDate=${QueryModel.FormatDate(this.startDate)}&endDate=${QueryModel.FormatDate(this.endDate)}`;
    path = this.take ? `${path}&take=${this.take}` : path;
    return this.groupId ? `${path}&groupId=${this.groupId}` : path;
  }

  get startDate(): Date {
    return this.search.dateRange.startDate;
  }

  get take(): number {
    return this.search.take;
  }

  ngOnInit() {
    this.search = build(MeetingsSearch, {
      dateRangeId: 11
    });
    this.subscribe([this.accountIdChanges]);
  }

  filter(search: MeetingsSearch) {
    this.search = search;
    this.getMeetings();
  }

  getMeetings() {
    this.dispatch(HttpActions.search(this.path, MeetingsActions.GET));
  }

  getAccountGroups(accountId: number) {
    this.dispatch(HttpActions.get(`accounts/${accountId}/groups`, GroupsActions.GET));
  }

}
