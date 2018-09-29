import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnnouncementEditComponent } from './announcement-edit.component';

const routes: Routes = [{
  path: '',
  component: AnnouncementEditComponent,
  data: { routeName: 'announcement-edit', routeLabel: 'Edit Announcement' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementEditRoutingModule { }
