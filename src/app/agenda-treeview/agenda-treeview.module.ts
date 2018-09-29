import { NgModule } from '@angular/core';

import { AgendaTreeviewComponent } from './agenda-treeview.component';
import { AgendaActionsComponent } from './agenda-actions/agenda-actions.component';
import { AgendaTreeItemComponent } from './agenda-tree-item/agenda-tree-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    AgendaTreeviewComponent,
    AgendaActionsComponent,
    AgendaTreeItemComponent,
  ]
})
export class AgendaTreeviewModule { }
