import { NgModule } from '@angular/core';

import { AgendaItemsRoutingModule } from './agenda-items-routing.module';
import { AgendaItemsComponent } from './agenda-items.component';
import { AgendaItemActionsComponent } from './agenda-item-actions/agenda-item-actions.component';
import { AgendaItemPreviewComponent } from './agenda-item-preview/agenda-item-preview.component';
import { AttachmentsModule } from '../attachments/attachments.module';
import { MinutesModule } from '../minutes/minutes.module';
import { NotesModule } from '../notes/notes.module';
import { VotesModule } from '../votes/votes.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AgendaItemsRoutingModule,
    AttachmentsModule,
    MinutesModule,
    NotesModule,
    VotesModule,
  ],
  declarations: [
    AgendaItemsComponent,
    AgendaItemActionsComponent,
    AgendaItemPreviewComponent,
  ],
  exports: [
    AgendaItemPreviewComponent,
  ]
})
export class AgendaItemsModule { }
