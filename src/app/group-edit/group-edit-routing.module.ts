import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupEditComponent } from './group-edit.component';

const routes: Routes = [{
  path: '',
  component: GroupEditComponent,
  data: { routeName: 'group-edit', routeLabel: 'Edit Group' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupEditRoutingModule { }
