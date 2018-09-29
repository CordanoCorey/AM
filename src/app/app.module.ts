import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
  apiBaseUrlSelector,
  authTokenSelector,
  configReducer,
  EffectsModule,
  errorsReducer,
  ErrorsModule,
  eventsReducer,
  EventEffects,
  EventsModule,
  lookupReducer,
  LookupModule,
  HttpEffects,
  HttpModule,
  routerReducer,
  RouterEffects,
  RouterModule,
  StorageEffects,
  StorageModule,
  windowReducer
} from '@caiu/library';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NotificationComponent } from './notifications/notification.component';

export const reducers: ActionReducerMap<any> = {
  config: configReducer,
  errors: errorsReducer,
  events: eventsReducer,
  lookup: lookupReducer,
  route: routerReducer,
  window: windowReducer
};

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    EffectsModule.forRoot([
      EventEffects,
      HttpEffects,
      RouterEffects,
      StorageEffects,
    ]),
    ErrorsModule.forRoot(),
    EventsModule,
    HttpModule.forRoot(apiBaseUrlSelector, authTokenSelector),
    LookupModule.forRoot(),
    RouterModule.forRoot(),
    StorageModule.forRoot('AMSuite'),
    StoreModule.forRoot(reducers),
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
