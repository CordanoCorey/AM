import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

@Injectable()
export class PrintResolver implements Resolve<DialogModel> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DialogModel> {
    const actions = [
      build(DialogAction, { value: 'close', label: 'Close', primary: true })
    ];
    return Observable.of(build(DialogModel, { title: 'Print', width: '1000px', actions }));
  }
}

const routes: Routes = [{
  path: 'print',
  outlet: 'popup',
  component: PrintComponent,
  data: { routeName: 'print', routeLabel: 'Print' },
  resolve: {
    dialog: PrintResolver
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PrintResolver]
})
export class PrintRoutingModule { }
