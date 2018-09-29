import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'am-attendance-log',
  templateUrl: './attendance-log.component.html',
  styleUrls: ['./attendance-log.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttendanceLogComponent {

  @Input() attendance: Attendance = new Attendance();

  constructor() { }

  get attendees(): Attendee[] {
    return this.attendance.toArray();
  }

}
