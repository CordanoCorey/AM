import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestoreComponent } from './restore.component';

const routes: Routes = [{
  path: '',
  component: RestoreComponent,
  data: { routeName: 'restore', routeLabel: 'Restore' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestoreRoutingModule { }
