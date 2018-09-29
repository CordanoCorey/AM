import { NgModule } from '@angular/core';

import { AnnouncementsWidgetComponent } from './announcements-widget.component';
import { AnnouncementPreviewComponent } from './announcement-preview/announcement-preview.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    AnnouncementsWidgetComponent,
    AnnouncementPreviewComponent,
  ]
})
export class AnnouncementsWidgetModule { }
