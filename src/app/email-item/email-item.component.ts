import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'am-email-item',
  templateUrl: './email-item.component.html',
  styleUrls: ['./email-item.component.scss'],
  animations: [
    trigger('toggle', [
      state('show', style({ height: '*' })),
      state('hide', style({ height: '0px' })),
      transition('show <=> hide', [
        animate('500ms ease-out')
      ])
    ])
  ]
})
export class EmailItemComponent extends SmartComponent implements OnInit {

  activeId = 0;
  emailItem$: Observable<EmailItem>;
  routeName = 'email-item';
  showEmailSent$: Observable<boolean>;

  constructor(public store: Store<any>) {
    super(store);
    this.emailItem$ = emailItemSelector(this.store);
    this.showEmailSent$ = Observable.of(false);
  }

  get actions(): DialogAction[] {
    return [
      build(DialogAction, { value: null, label: 'Close' }),
      build(DialogAction, { value: 'send', label: 'Send', color: 'accent' }),
    ];
  }

  get title(): string {
    return 'Email';
  }

  ngOnInit() {
  }

  addEmail(emailItem: EmailItem) {
    this.dispatch(HttpActions.post(`email`, emailItem, EmailActions.POST));
  }

  getGroupMembers(groupId: number) {
    this.dispatch(HttpActions.get(`groups/${groupId}/members`, GroupMembersActions.GET));
  }

}
