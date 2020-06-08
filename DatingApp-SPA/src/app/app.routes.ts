import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_gaurds/auth.guard';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberDetailResolver } from './_resolvers/member-details.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { OnDeactivateGuard } from './_gaurds/on-deactivate.guard';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MembersListComponent,resolve:{users:MemberListResolver} },
      { path: 'members/:id', component: MemberDetailsComponent,resolve:{user:MemberDetailResolver} },
      { path: 'member/edit', component: MemberEditComponent,resolve:{user:MemberEditResolver}, canDeactivate:[OnDeactivateGuard] },
      { path: 'list', component: ListComponent },
      { path: 'messages', component: MessagesComponent },
    ],
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];
