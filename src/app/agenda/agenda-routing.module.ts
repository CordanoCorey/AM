import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaComponent } from './agenda.component';

const routes: Routes = [{
  path: '',
  component: AgendaComponent,
  data: { routeName: 'agenda', routeLabel: 'Agenda' },
  children: [
    {
      path: 'agendaitems',
      loadChildren: '../agenda-items/agenda-items.module#AgendaItemsModule'
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule { }
