import { Component, OnInit } from '@angular/core';
import { SmartComponent, CurrentUser, currentUserSelector } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { UserActions } from '../actions';

@Component({
  selector: 'am-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends SmartComponent implements OnInit {

  user$: Observable<CurrentUser>;

  constructor(public store: Store<any>) {
    super(store);
    this.user$ = currentUserSelector(store);
  }

  ngOnInit() {
  }

  revertToAdmin() {
    this.dispatch({ type: UserActions.REVERT_TO_ADMIN });
  }

}
