import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'am-members-import',
  templateUrl: './members-import.component.html',
  styleUrls: ['./members-import.component.scss']
})
export class MembersImportComponent extends SmartComponent implements OnInit {

  routeName = 'members-import';

  constructor(public store: Store<any>) {
    super(store);
  }

  ngOnInit() {
  }

  getAccountMembers() {
    throwNotImplementedException();
  }

  updateGroupMembers() {
    throwNotImplementedException();
  }

}
