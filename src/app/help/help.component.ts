import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'am-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent extends SmartComponent implements OnInit {

  routeName = 'help';

  constructor(public store: Store<any>) {
    super(store);
  }

  ngOnInit() {
  }

  getJson() {
    this.dispatch(HttpActions.get(`lookup/AppJson`, AppActions.LOAD_JSON));
  }
}