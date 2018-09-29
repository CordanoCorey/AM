import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'am-announcements-widget',
  templateUrl: './announcements-widget.component.html',
  styleUrls: ['./announcements-widget.component.scss']
})
export class AnnouncementsWidgetComponent extends SmartComponent implements OnInit {

  accountId = 0;
  accountId$: Observable<number>;
  announcements$: Observable<Announcement[]>;
  dialogRef: Subscription;
  empty$: Observable<boolean>;
  userId = 0;
  userId$: Observable<number>;

  constructor(
    public store: Store<any>,
    public dialog: MatDialog) {
    super(store);
    this.accountId$ = currentAccountIdSelector(this.store);
    this.announcements$ = announcementsSelector(this.store).map(announcements => announcements.toArray());
    this.empty$ = this.announcements$.map(announcements => announcements.length === 0);
    this.userId$ = currentUserIdSelector(this.store);
  }

  get accountIdChanges(): Subscription {
    return this.accountId$.subscribe(id => {
      this.accountId = id;
      if (this.accountId) {
        this.getAccountAnnouncements(this.accountId);
      }
    });
  }

  get userIdChanges(): Subscription {
    return this.userId$.subscribe(id => {
      this.userId = id;
      if (this.userId) {
        this.getUserAnnouncements(this.userId);
      }
    });
  }

  ngOnInit() {
    this.subscribe([this.accountIdChanges, this.userIdChanges]);
  }

  open(announcement: Announcement) {
    this.openDialog(AnnouncementComponent, { data: announcement, width: '1000px' });
  }

  getAccountAnnouncements(accountId: number) {
    this.dispatch(HttpActions.get(`accounts/${accountId}/announcements`, AnnouncementsActions.GET));
  }

  getUserAnnouncements(userId: number) {
    this.dispatch(HttpActions.get(`users/${userId}/announcements`, AnnouncementsActions.GET));
  }

}
