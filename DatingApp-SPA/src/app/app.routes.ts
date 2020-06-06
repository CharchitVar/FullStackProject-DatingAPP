import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MembersListComponent } from './members-list/members-list.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_gaurds/auth.guard';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MembersListComponent },
      { path: 'list', component: ListComponent },
      { path: 'messages', component: MessagesComponent },
    ],
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];
