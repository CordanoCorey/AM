import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaItemsComponent } from './agenda-items.component';

const routes: Routes = [{
  path: ':agendaItemId',
  component: AgendaItemsComponent,
  data: { routeName: 'agenda-items', routeLabel: 'Agenda Items' },
  children: [
    {
      path: '',
      pathMatch: 'full',
      loadChildren: 'app/agenda-manager/agenda-item/agenda-item.module#AgendaItemModule'
    },
    {
      path: 'edit',
      pathMatch: 'full',
      loadChildren: 'app/agenda-manager/agenda-item-edit/agenda-item-edit.module#AgendaItemEditModule'
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaItemsRoutingModule { }
