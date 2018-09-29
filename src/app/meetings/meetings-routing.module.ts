import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetingsComponent } from './meetings.component';

const routes: Routes = [{
  path: '',
  data: { routeName: 'meetings', routeLabel: 'Meetings' },
  children: [
    {
      path: '',
      pathMatch: 'full',
      component: MeetingsComponent,
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingsRoutingModule { }
