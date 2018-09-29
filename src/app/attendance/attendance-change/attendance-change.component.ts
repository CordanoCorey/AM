import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'am-attendance-change',
  templateUrl: './attendance-change.component.html',
  styleUrls: ['./attendance-change.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttendanceChangeComponent {

  @Input() attendance: Attendance = new Attendance();
  @Output() depart = new EventEmitter<number>();
  @Output() join = new EventEmitter<number>();
  @Output() writeIn = new EventEmitter<string>();

  constructor() { }

  get attendees(): Attendee[] {
    return this.attendance.attendees;
  }

  onDepart(userId: number) {
    this.depart.emit(userId);
  }

  onJoin(userId: number) {
    this.join.emit(userId);
  }

  onWriteIn(value: string) {
    this.writeIn.emit(value);
  }

}
