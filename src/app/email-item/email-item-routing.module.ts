import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class EmailItemResolver implements Resolve<DialogModel> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DialogModel> {
    const actions = [
      build(DialogAction, { value: 'close', label: 'Close', color: 'accent' }),
      build(DialogAction, { value: 'send', label: 'Send', color: 'accent' })
    ];
    return Observable.of(build(DialogModel, { title: 'EmailItem', width: '1000px', actions }));
  }
}

const routes: Routes = [{
  path: 'email',
  outlet: 'popup',
  component: EmailItemComponent,
  data: { routeName: 'email', routeLabel: 'Email' },
  resolve: {
    dialog: EmailItemResolver
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    EmailItemResolver,
  ]
})
export class EmailItemRoutingModule { }
