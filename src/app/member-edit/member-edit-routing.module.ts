import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberEditComponent } from './member-edit.component';

const routes: Routes = [{
  path: '',
  component: MemberEditComponent,
  data: { routeName: 'member-edit', routeLabel: 'Edit Member' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberEditRoutingModule { }
