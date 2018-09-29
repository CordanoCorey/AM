import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'am-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends SmartComponent implements OnInit {

  dashboard$: Observable<Dashboard>;
  hasMessage$: Observable<boolean>;
  routeName = 'dashboard';

  constructor(
    public store: Store<any>,
    public dialog: MatDialog) {
    super(store);
    this.dashboard$ = dashboardSelector(this.store);
    this.hasMessage$ = Observable.of(false);
  }

  ngOnInit() {
    this.dispatch(TabsActions.activate('dashboard'));
  }

  onDrop() {
  }

}
