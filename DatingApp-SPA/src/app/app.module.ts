import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { JwtModule } from '@auth0/angular-jwt';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { TimeagoModule } from 'ngx-timeago';
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AuthServiceService } from './_service/AuthService.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_service/error-interceptor';
import { RouterModule} from '@angular/router';
import { appRoutes } from './app.routes';
import { MessagesComponent } from './messages/messages.component';
import { ListComponent } from './list/list.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberDetailResolver } from './_resolvers/member-details.resolver';
import { AlertifyService } from './_service/alertify.service';
import { UserService } from './_service/user.service';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { AuthGuard } from './_gaurds/auth.guard';
import { OnDeactivateGuard } from './_gaurds/on-deactivate.guard';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';

//For Sending JWT Token to Server

export function tokenGetter(){
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      NavBarComponent,
      HomeComponent,
      RegisterComponent,
      MessagesComponent,
      ListComponent,
      MembersListComponent,
      MemberCardComponent,
      MemberDetailsComponent,
      MemberEditComponent,
      PhotoEditorComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      NgxGalleryModule,
      FileUploadModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      TimeagoModule.forRoot(),
      BsDatepickerModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            tokenGetter:tokenGetter,
            whitelistedDomains:['localhost:5000'],
            blacklistedRoutes:['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      AuthServiceService,
      ErrorInterceptorProvider,
      MemberDetailResolver,
      AlertifyService,
      UserService,
      MemberListResolver,
      MemberEditResolver,
      AuthGuard,
      OnDeactivateGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
