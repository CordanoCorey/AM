import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'am-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent extends SmartComponent implements OnInit {

  routeName = 'email';

  constructor(public store: Store<any>) {
    super(store);
  }

  ngOnInit() {
  }

  send() {
  }

}
