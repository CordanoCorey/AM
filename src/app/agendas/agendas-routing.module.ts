import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendasComponent } from './agendas.component';

const routes: Routes = [{
  path: '',
  component: AgendasComponent,
  data: { routeName: 'agendas', routeLabel: 'Agendas' },
  children: [
    {
      path: ':agendaId',
      loadChildren: 'app/agenda-manager/agenda/agenda.module#AgendaModule'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendasRoutingModule { }
