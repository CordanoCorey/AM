import { NgModule } from '@angular/core';
import { GridModule } from '@caiu/grid';
import { LibraryModule } from '@caiu/library';

import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';
import { PanelYellowComponent } from './panel-yellow/panel-yellow.component';

@NgModule({
  imports: [
    LibraryModule,
    GridModule,
  ],
  declarations: [
    ContainerComponent,
    HeaderComponent,
    PanelYellowComponent,
  ],
  exports: [
    LibraryModule,
    GridModule,
    ContainerComponent,
    PanelYellowComponent,
  ]
})
export class SharedModule { }
