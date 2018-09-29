import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetingComponent } from './meeting.component';

const routes: Routes = [{
  path: '',
  component: MeetingComponent,
  data: { routeName: 'meeting', routeLabel: 'Meeting' },
  children: [
    {
      path: 'agendas',
      loadChildren: 'app/agenda-manager/agendas/agendas.module#AgendasModule'
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingRoutingModule { }
