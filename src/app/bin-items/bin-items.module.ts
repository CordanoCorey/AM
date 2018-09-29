import { NgModule } from '@angular/core';

import { BinItemsRoutingModule } from './bin-items-routing.module';
import { BinComponent } from './bin.component';
import { BinAccountsComponent } from './bin-accounts/bin-accounts.component';
import { BinEmptyComponent } from './bin-empty/bin-empty.component';
import { BinItemComponent } from './bin-item/bin-item.component';
import { BinItemOptionsComponent } from './bin-item-options/bin-item-options.component';
import { BinItemPreviewComponent } from './bin-item-preview/bin-item-preview.component';
import { BinItemsDropdownComponent } from './bin-items-dropdown/bin-items-dropdown.component';
import { BinItemsListComponent } from './bin-items-list/bin-items-list.component';
import { AttachmentsModule } from '../attachments/attachments.module';
import { MinutesModule } from '../minutes/minutes.module';
import { NotesModule } from '../notes/notes.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    BinItemsRoutingModule,
    AttachmentsModule,
    MinutesModule,
    NotesModule,
  ],
  declarations: [
    BinComponent,
    BinAccountsComponent,
    BinEmptyComponent,
    BinItemComponent,
    BinItemOptionsComponent,
    BinItemPreviewComponent,
    BinItemsDropdownComponent,
    BinItemsListComponent,
  ],
  entryComponents: [
    BinComponent,
  ]
})
export class BinItemsModule { }
