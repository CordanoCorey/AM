import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { MinutesComponent } from './minutes.component';

@Injectable()
export class MinutesResolver implements Resolve<DialogModel> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DialogModel> {
    const actions = [
      build(DialogAction, { value: 'close', label: 'Close', primary: true })
    ];
    return Observable.of(build(DialogModel, { title: 'Minutes', width: '1000px', actions }));
  }
}

const routes: Routes = [{
  path: 'minutes',
  outlet: 'popup',
  data: { routeName: 'minutes', routeLabel: 'Minutes' },
  component: MinutesComponent,
  resolve: {
    dialog: MinutesResolver
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    MinutesResolver,
  ]
})
export class MinutesRoutingModule { }
