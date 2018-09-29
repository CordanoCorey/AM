import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountsComponent } from './accounts.component';

const routes: Routes = [{
  path: '',
  component: AccountsComponent,
  data: { routeName: 'accounts', routeLabel: 'Accounts' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
