import { Component, OnInit, HostListener } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import {
  build,
  LookupService,
  Lookup,
  RouterService,
  routeNameSelector,
  StorageService,
  SmartComponent,
  ConfigActions,
  WindowActions,
  WindowResize
} from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { environment } from '../environments/environment';

@Component({
  selector: 'am-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends SmartComponent implements OnInit {

  currentUrl = '/';
  routeData: Subscription;
  routeName$: Observable<string>;

  constructor(
    public store: Store<any>,
    public lookup: LookupService,
    private routerService: RouterService,
    public storage: StorageService) {
    super(store);
    this.routeName$ = routeNameSelector(this.store);
  }

  get localStorageActions(): string[] {
    return [];
  }

  get localStorageMapper(): (x: any) => any {
    return (s: any) => ({});
  }

  get lookupKeys(): string[] {
    return [];
  }

  get lookupValues(): Lookup[] {
    return [];
  }

  get sessionStorageActions(): string[] {
    return [];
  }

  get sessionStorageMapper(): (x: any) => any {
    return (s: any) => ({});
  }

  ngOnInit() {
    this.loadConfiguration();
    this.initStorage();
    // this.initLookup();
  }

  initLookup() {
    this.lookup.load(this.lookupKeys, this.lookupValues);
  }

  initRouting() {
    this.routerService.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.currentUrl = e.urlAfterRedirects;
        this.onNavigationEnd(e);
      }
    });
  }

  initStorage() {
    this.storage.init(this.localStorageMapper, this.sessionStorageMapper, this.localStorageActions, this.sessionStorageActions);
  }

  loadConfiguration() {
    this.dispatch(ConfigActions.initialize(environment));
  }

  onNavigationEnd(e: NavigationEnd): void {
    window.scrollTo(0, 0);
  }

  @HostListener('window:load', ['$event'])
  onLoad(e: any) {
    const windowHeight = e && e.currentTarget && e.currentTarget.innerHeight ? e.currentTarget.innerHeight : 0;
    const windowWidth = e && e.currentTarget && e.currentTarget.innerWidth ? e.currentTarget.innerWidth : 0;
    this.dispatch(WindowActions.resize(build(WindowResize, { windowHeight, windowWidth })));
  }

  @HostListener('window:resize', ['$event'])
  onResize(e: any) {
    const windowHeight = e && e.currentTarget && e.currentTarget.innerHeight ? e.currentTarget.innerHeight : 0;
    const windowWidth = e && e.currentTarget && e.currentTarget.innerWidth ? e.currentTarget.innerWidth : 0;
    this.dispatch(WindowActions.resize(build(WindowResize, { windowHeight, windowWidth })));
  }

}
