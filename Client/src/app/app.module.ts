import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { ApiModule } from './api/api.module';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { UpcomingMeetupsComponent } from './upcoming-meetups/upcoming-meetups.component';
import { MeetupDetailsComponent } from './meetup-details/meetup-details.component';
import { LoginComponent } from './login/login.component';
import { NewMeetupComponent } from './new-meetup/new-meetup.component';
import { LoginService } from './login.service';
import { UsersService } from './api';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    MapComponent,
    UpcomingMeetupsComponent,
    MeetupDetailsComponent,
    LoginComponent,
    NewMeetupComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'map', component: MapComponent },
      { path: 'login', component: LoginComponent },
      { path: 'meetups/:id', component: MeetupDetailsComponent },
      { path: 'new-meetup', component: NewMeetupComponent }
    ]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDvvRL2tvcsZ8_BePHHzVJWeoxwmy_eBHQ'
    })
  ],
  providers: [UsersService, LoginService, ApiModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
