import { Component, Input } from '@angular/core';

@Component({
  selector: 'am-account-groups',
  templateUrl: './account-groups.component.html',
  styleUrls: ['./account-groups.component.scss']
})
export class AccountGroupsComponent {

  @Input() account: Account = new Account();
  @Input() userGroups: GroupMember[] = [];

  constructor() { }

  get accountId(): number {
    return this.account.id;
  }

  get accountName(): string {
    return this.account.name;
  }

  get groups(): Group[] {
    return this.userGroups.map(g => g.group);
  }

  get accountGroups(): GroupMember[] {
    return this.userGroups.filter(g => g.group.accountId === this.accountId);
  }

}
