import { NgModule } from '@angular/core';

import { NotificationsWidgetComponent } from './notifications-widget.component';
import { NotificationPreviewComponent } from './notification-preview/notification-preview.component';
import { NotificationsModule } from '../notifications/notifications.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    NotificationsModule,
  ],
  declarations: [
    NotificationsWidgetComponent,
    NotificationPreviewComponent,
  ]
})
export class NotificationsWidgetModule { }
