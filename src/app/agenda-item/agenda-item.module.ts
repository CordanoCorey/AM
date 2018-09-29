import { NgModule } from '@angular/core';

import { AgendaItemRoutingModule } from './agenda-item-routing.module';
import { AgendaItemComponent } from './agenda-item.component';
import { AttachmentsModule } from '../attachments/attachments.module';
import { NotesModule } from '../notes/notes.module';
import { VotesModule } from '../votes/votes.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AgendaItemRoutingModule,
    AttachmentsModule,
    NotesModule,
    VotesModule,
  ],
  declarations: [
    AgendaItemComponent,
  ]
})
export class AgendaItemModule { }
