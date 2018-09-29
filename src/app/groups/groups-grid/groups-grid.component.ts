import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'am-groups-grid',
  templateUrl: './groups-grid.component.html',
  styleUrls: ['./groups-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsGridComponent {

  @Input() accountUrl = '';
  @Input() groups: Group[] = [];

  constructor() { }

  get grid(): Grid<GroupRow> {
    return Grid.Build<GroupRow>(this.rows);
  }

  get rows(): GroupRow[] {
    return this.groups.map(group => new GroupRow(group, this.accountUrl));
  }

  getGridHeight(): number {
    return this.rows.length > 0 ? 320 : 50;
  }

  get createdByColumn(): GridColumn<string> {
    return new GridColumn<string>('createdBy', 'Created By');
  }

  get groupNameColumn(): GridColumn<string> {
    return new GridColumn<string>('groupName', 'Group Name');
  }

  get membersColumn(): GridColumn<number> {
    return new GridColumn<number>('members', 'Members');
  }

}
