import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailComponent } from './email.component';

const routes: Routes = [{
  path: '',
  component: EmailComponent,
  data: { routeName: 'email', routeLabel: 'Email' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule { }