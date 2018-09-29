import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetingEditComponent } from './meeting-edit.component';

const routes: Routes = [{
  path: '',
  component: MeetingEditComponent,
  data: { routeName: 'meeting-edit', routeLabel: 'Edit Meeting' },
  children: [
    {
      path: 'agendas/:agendaId',
      loadChildren: 'app/agenda-manager/agenda-edit/agenda-edit.module#AgendaEditModule'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingEditRoutingModule { }
