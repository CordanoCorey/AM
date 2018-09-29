import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnnouncementsComponent } from './announcements.component';

@Injectable()
export class AnnouncementResolver implements Resolve<DialogModel> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DialogModel> {
    const actions = [
      build(DialogAction, { value: 'close', label: 'Close', primary: true })
    ];
    return Observable.of(build(DialogModel, { title: 'Announcement', height: 600, width: 800, actions }));
  }
}

const routes: Routes = [
  {
    path: '',
    component: AnnouncementsComponent,
    data: { routeName: 'announcements', routeLabel: 'Announcements' },
    children: [
      {
        path: ':announcementId',
        pathMatch: 'full',
        redirectTo: ':announcementId/edit'
      },
      {
        path: ':announcementId/edit',
        loadChildren: 'app/core/announcement-edit/announcement-edit.module#AnnouncementEditModule'
      },
    ]
  },
  {
    path: 'announcement',
    outlet: 'popup',
    component: AnnouncementComponent,
    resolve: {
      dialog: AnnouncementResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AnnouncementResolver]
})
export class AnnouncementsRoutingModule { }
