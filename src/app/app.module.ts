import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdSnackBarModule} from '@angular/material';
import {
  MdIconModule, MdListModule, MdButtonModule, MdCheckboxModule} from '@angular/material';
import {MdCardModule, MdOptionModule, MdSelectModule, MdProgressBarModule,
        MdProgressSpinnerModule, MdToolbarModule, MdGridListModule, MdInputModule} from '@angular/material';
import {MdMenuModule} from '@angular/material';
import 'rxjs/add/observable/of';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import {LoginService} from './services/login/login.service';
import {AppRequestOptions} from './http/app-request-options';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, data: {title: 'Login'}},
  { path: '**', redirectTo: '', canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ToolbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule, MdToolbarModule,
    MdButtonModule, MdCheckboxModule,
    MdIconModule, MdListModule, MdCardModule, MdOptionModule, MdSelectModule,
    MdProgressBarModule, MdProgressSpinnerModule, MdGridListModule,
    MdMenuModule, MdInputModule, MdSnackBarModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuard, LoginService,
              {provide : 'webApiBaseUrl', useValue: 'http://localhost:8080' }, AppRequestOptions],
  bootstrap: [AppComponent ]
})
export class AppModule {
  title;
  constructor(private router: Router) {
    this.title = 'Test';
  }
}
