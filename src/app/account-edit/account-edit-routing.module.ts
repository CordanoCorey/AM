import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountEditComponent } from './account-edit.component';

const routes: Routes = [{
  path: '',
  component: AccountEditComponent,
  data: { routeName: 'account-edit', routeLabel: 'Account Edit' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountEditRoutingModule { }
