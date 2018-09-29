import { NgModule } from '@angular/core';

import { UserAccountsRoutingModule } from './user-accounts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserAccountsComponent } from './user-accounts.component';

@NgModule({
  imports: [
    SharedModule,
    UserAccountsRoutingModule
  ],
  declarations: [UserAccountsComponent]
})
export class UserAccountsModule { }
