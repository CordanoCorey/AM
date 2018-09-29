import { NgModule } from '@angular/core';

import { HelpRoutingModule } from './help-routing.module';
import { HelpComponent } from './help.component';
import { AboutHelpComponent } from './about-help/about-help.component';
import { HelpButtonComponent } from './help-button/help-button.component';
import { HelpWidgetComponent } from './help-widget/help-widget.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    HelpRoutingModule,
  ],
  declarations: [
    HelpComponent,
    AboutHelpComponent,
    HelpButtonComponent,
    HelpWidgetComponent,
  ]
})
export class HelpModule { }
