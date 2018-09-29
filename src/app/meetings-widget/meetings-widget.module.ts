import { NgModule } from '@angular/core';

import { MeetingsWidgetComponent } from './meetings-widget.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    MeetingsWidgetComponent,
  ],
  exports: [
    MeetingsWidgetComponent,
  ]
})
export class MeetingsWidgetModule { }
