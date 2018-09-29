import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'am-agenda-item-edit',
  templateUrl: './agenda-item-edit.component.html',
  styleUrls: ['./agenda-item-edit.component.scss']
})
export class AgendaItemEditComponent extends SmartComponent implements OnInit {

  agendaItem$: Observable<AgendaItem>;
  agendaItemId = 0;
  agendaItemId$: Observable<number>;
  agendaItemDescription$: Observable<string>;
  agendaItemName$: Observable<string>;
  editMode$: Observable<boolean>;
  routeName = 'agenda-item-edit';
  user$: Observable<CurrentUser>;
  userCanEdit$: Observable<boolean>;
  userHasBin$: Observable<boolean>;

  constructor(public store: Store<any>) {
    super(store);
    this.agendaItem$ = agendaItemSelector(this.store);
    this.agendaItemId$ = activeAgendaItemIdSelector(this.store);
    this.agendaItemDescription$ = this.agendaItem$.map(ai => ai.description).distinctUntilChanged();
    this.agendaItemName$ = this.agendaItem$.map(ai => ai.name).distinctUntilChanged();
    this.editMode$ = this.agendaItem$.map(model => false);
    this.user$ = currentUserSelector(this.store);
    this.userCanEdit$ = this.user$.map(model => true);
    this.userHasBin$ = this.user$.map(model => true);
  }

  get agendaItemIdChanges(): Subscription {
    return this.agendaItemId$.subscribe(id => {
      this.agendaItemId = id;
    });
  }

  ngOnInit() {
    this.subscribe([this.agendaItemIdChanges]);
    this.dispatch(AgendasActions.toggle(false));
  }

  addAgendaItem(agendaItem: AgendaItem) {
    this.dispatch(HttpActions.post(`agendaitems`, agendaItem, AgendaItemsActions.POST));
  }

  getAgendaItem(agendaItemId: number) {
    this.dispatch(HttpActions.get(`agendaitems/${agendaItemId}`, AgendaItemActions.GET));
  }

  updateAgendaItem(agendaItem: AgendaItem) {
    this.dispatch(HttpActions.put(`agendaitems/${agendaItem.id}`, agendaItem, AgendaItemActions.PUT));
  }

}
