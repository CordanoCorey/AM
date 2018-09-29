import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'am-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AttendanceComponent extends SmartComponent implements OnInit {

  attendance$: Observable<Attendance>;
  heading$: Observable<string>;
  showAttendanceChange$: Observable<boolean>;
  showAttendanceLog$: Observable<boolean>;
  showRollCall$: Observable<boolean>;

  constructor(public store: Store<any>) {
    super(store);
    this.attendance$ = attendanceSelector(this.store);
    this.heading$ = this.attendance$.map(attendance => 'Roll Call');
    this.showAttendanceChange$ = Observable.of(true);
    this.showAttendanceLog$ = Observable.of(true);
    this.showRollCall$ = Observable.of(true);
  }

  ngOnInit() {
  }

  onDepart(userId: number) {
  }

  onJoin(userId: number) {
  }

  onWriteIn(value: string) {
  }

}
