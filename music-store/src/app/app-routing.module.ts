import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { MusicComponent } from './music/music.component';
import { AdminComponent } from './admin/admin.component';
import { AuthenticationService } from './authentication.service';
import { AdminService } from './admin.service';
import { ErrorComponent } from './error/error.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomecomponentComponent } from './homecomponent/homecomponent.component';
import { MusicplayComponent } from './musicplay/musicplay.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'music',
    component: MusicComponent,
    canActivate: [AuthenticationService]
  },
  {
    path: 'home',
    component: HomecomponentComponent
  },
  {
    path: '',
    component: HomecomponentComponent
  },
  {
    path: 'music/admin',
    component: AdminComponent,
    canActivate: [AuthenticationService, AdminService]
  },
  {
    path:'music/song-info',
    component:MusicplayComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
