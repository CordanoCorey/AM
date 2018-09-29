import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsComponent } from './groups.component';

const routes: Routes = [{
  path: '',
  component: GroupsComponent,
  data: { routeName: 'groups', routeLabel: 'Groups' },
  children: [
    {
      path: ':groupId',
      pathMatch: 'full',
      redirectTo: ':groupId/edit'
    },
    {
      path: ':groupId/edit',
      loadChildren: 'app/core/group-edit/group-edit.module#GroupEditModule'
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
