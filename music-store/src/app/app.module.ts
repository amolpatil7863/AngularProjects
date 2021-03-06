import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MusicComponent } from './music/music.component';
import { SafeurlPipe } from './safeurl.pipe';
import { ModalModule } from 'ngb-modal';
import { RouterModule } from '@angular/router';
// import { APP_ROUTES } from './app.routes';
import { AdminComponent } from './admin/admin.component';
import { HomecomponentComponent } from './homecomponent/homecomponent.component';
import { LayoutComponent } from './layout/layout.component';
import { CookieService } from 'ngx-cookie-service';
import { ErrorComponent } from './error/error.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MusicplayComponent } from './musicplay/musicplay.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MusicComponent,
    SafeurlPipe,
    AdminComponent,
    HomecomponentComponent,
    LayoutComponent,
    ErrorComponent,
    NotfoundComponent,
    MusicplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule,
  
    // RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
