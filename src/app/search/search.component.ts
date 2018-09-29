import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SmartComponent, HttpActions } from '@caiu/library';
import { Store } from '@ngrx/store';

import { SearchActions } from '../shared/actions';

@Component({
  selector: 'am-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent extends SmartComponent implements OnInit {

  routeName = 'search';

  constructor(public store: Store<any>) {
    super(store);
  }

  ngOnInit() {
  }

  quickSearch(query: any) {
    this.dispatch(HttpActions.post(`search/quick`, query, SearchActions.POST));
  }

  search(query: any) {
    this.dispatch(HttpActions.post(`search`, query, SearchActions.POST));
  }

}
