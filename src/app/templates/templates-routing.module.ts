import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Route } from '@angular/router';

import { TemplatesComponent } from './templates.component';

@Injectable()
export class TemplateManagerResolver implements Resolve<DialogModel> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DialogModel> {
    const actions = [
      build(DialogAction, { value: 'yes', label: 'Yes', primary: true }),
      build(DialogAction, { value: 'no', label: 'No', primary: false })
    ];
    return Observable.of(build(DialogModel, { title: 'Template Manager', width: '1000px', actions }));
  }
}

@Injectable()
export class TemplateDialogResolver implements Resolve<DialogModel> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DialogModel> {
    const actions = [
      build(DialogAction, { value: 'yes', label: 'Yes', primary: true }),
      build(DialogAction, { value: 'no', label: 'No', primary: false })
    ];
    return Observable.of(build(DialogModel, { title: 'Template Manager', width: '1200px', actions }));
  }
}

const routes: Routes = [{
  path: 'templates',
  outlet: 'popup',
  data: { routeName: 'template-manager', routeLabel: 'Template Manager' },
  component: TemplatesComponent,
  resolve: {
    dialog: TemplateManagerResolver
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    TemplateDialogResolver,
    TemplateManagerResolver,
  ]
})
export class TemplatesRoutingModule { }
