import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, PreloadAllModules } from '@angular/router';
import { NotFoundComponent, AuthenticatedGuard } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

@Injectable()
export class RootGuard implements CanActivate {

  accountUrl = '';

  constructor(public store: Store<any>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return of(true);
  }

  private getUrl(route: ActivatedRouteSnapshot): string {
    const url = route.url.map(segment => segment.path)
      .reduce((acc, val) => acc + val, '');
    if (url === 'dashboard') {
      return `${this.accountUrl}/dashboard`;
    } else if (url === 'account') {
      return `${this.accountUrl}/account`;
    }
    return url;
  }
}

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'not-found',
        component: NotFoundComponent,
        data: { routeName: 'not-found', routeLabel: 'Not Found' }
      },
      {
        path: 'home',
        redirectTo: 'login'
      },
      {
        path: 'contact',
        redirectTo: 'help'
      },
      {
        path: 'login',
        canActivate: [RootGuard],
        loadChildren: './login/login.module#LoginModule'
      },
      {
        path: 'reset-password',
        loadChildren: './reset-password/reset-password.module#ResetPasswordModule'
      },
      {
        path: 'search',
        loadChildren: './search/search.module#SearchModule'
      },
      {
        path: 'help',
        loadChildren: './help/help.module#HelpModule'
      },
      {
        path: 'accounts',
        canActivate: [RootGuard],
        loadChildren: './accounts/accounts.module#AccountsModule'
      },
      {
        path: 'admin',
        canActivate: [AuthenticatedGuard],
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'accounts'
          },
          {
            path: 'account/edit',
            pathMatch: 'full',
            redirectTo: 'edit'
          },
          {
            path: 'basicinfo',
            pathMatch: 'full',
            redirectTo: 'info'
          },
          {
            path: 'users',
            pathMatch: 'full',
            redirectTo: 'members'
          },
          {
            path: 'accounts',
            loadChildren: './accounts/accounts.module#AccountsModule'
          },
          {
            path: 'accounts/new',
            loadChildren: './account-edit/account-edit.module#AccountEditModule'
          },
          {
            path: 'announcements',
            loadChildren: './announcements/announcements.module#AnnouncementsModule'
          },
          {
            path: 'edit',
            loadChildren: './account-edit/account-edit.module#AccountEditModule'
          },
          {
            path: 'groups',
            loadChildren: './groups/groups.module#GroupsModule'
          },
          {
            path: 'info',
            loadChildren: './account-info/account-info.module#AccountInfoModule'
          },
          {
            path: 'members',
            loadChildren: './members/members.module#MembersModule'
          },
          {
            path: 'restore',
            loadChildren: './restore/restore.module#RestoreModule'
          },
        ]
      },
      {
        path: ':account',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'account'
          },
          {
            path: 'account-edit',
            pathMatch: 'full',
            redirectTo: 'edit'
          },
          {
            path: 'attachments',
            redirectTo: 'files'
          },
          {
            path: 'basicinfo',
            redirectTo: 'info'
          },
          {
            path: 'import/members',
            redirectTo: 'members/import'
          },
          {
            path: 'meeting/edit/:meetingId',
            redirectTo: 'meetings/:meetingId/edit'
          },
          {
            path: 'meeting/view/:meetingId/:agendaId/:agendaItemId',
            redirectTo: 'meetings/:meetingId/agendas/:agendaId/agendaitems/:agendaItemId'
          },
          {
            path: 'meeting/view/:meetingId/:agendaId',
            redirectTo: 'meetings/:meetingId/agendas/:agendaId'
          },
          {
            path: 'meeting/view/:meetingId',
            redirectTo: 'meetings/:meetingId'
          },
          {
            path: 'edit',
            loadChildren: './account-edit/account-edit.module#AccountEditModule'
          },
          {
            path: 'account',
            loadChildren: './account-detail/account-detail.module#AccountDetailModule'
          },
          {
            path: 'announcements',
            loadChildren: './announcements/announcements.module#AnnouncementsModule'
          },
          {
            path: 'dashboard',
            canActivate: [RootGuard],
            loadChildren: './dashboard/dashboard.module#DashboardModule'
          },
          {
            path: 'groups',
            loadChildren: './groups/groups.module#GroupsModule'
          },
          {
            path: 'info',
            loadChildren: './account-info/account-info.module#AccountInfoModule'
          },
          {
            path: 'members',
            loadChildren: './members/members.module#MembersModule'
          },
          {
            path: 'profile',
            loadChildren: './profile/profile.module#ProfileModule',
            canActivate: [AuthenticatedGuard]
          },
          {
            path: 'restore',
            loadChildren: './restore/restore.module#RestoreModule'
          },
          {
            path: 'search',
            loadChildren: './search/search.module#SearchModule'
          },
          {
            path: 'files',
            loadChildren: './files/files.module#FilesModule'
          },
          {
            path: 'meetings/:meetingId/edit',
            loadChildren: './meeting-edit/meeting-edit.module#MeetingEditModule'
          },
          {
            path: 'meetings/:meetingId',
            loadChildren: './meeting/meeting.module#MeetingModule'
          },
          {
            path: 'meetings',
            loadChildren: './meetings/meetings.module#MeetingsModule'
          },
        ]
      },
      {
        path: '**',
        redirectTo: 'not-found'
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [
    AuthenticatedGuard,
    RootGuard,
  ]
})
export class AppRoutingModule { }
