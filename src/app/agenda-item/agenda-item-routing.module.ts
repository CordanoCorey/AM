import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaItemComponent } from './agenda-item.component';

const routes: Routes = [{
  path: '',
  component: AgendaItemComponent,
  data: { routeName: 'agenda-item', routeLabel: 'Agenda Item' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaItemRoutingModule { }
