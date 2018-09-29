import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaItemEditComponent } from './agenda-item-edit.component';

const routes: Routes = [{
  path: '',
  component: AgendaItemEditComponent,
  data: { routeName: 'agenda-item-edit', routeLabel: 'Edit Agenda Item' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaItemEditRoutingModule { }
