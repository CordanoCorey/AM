import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaEditComponent } from './agenda-edit.component';

const routes: Routes = [{
  path: '',
  component: AgendaEditComponent,
  data: { routeName: 'agenda-edit', routeLabel: 'Edit Agenda' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaEditRoutingModule { }
