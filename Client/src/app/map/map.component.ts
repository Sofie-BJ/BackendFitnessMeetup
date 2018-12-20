import { Component, OnInit } from '@angular/core';
import { CookieService } from './CookieService';
import { Meetup, MeetupsService } from '../api';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [MeetupsService]
})
export class MapComponent implements OnInit {
  lat: number;
  lng: number;
  zoom: number;

  meetups$: Observable<HttpResponse<Meetup[]>>;

  constructor(private meetupsService: MeetupsService) { }

  ngOnInit(): void {
    this.checkCookies();
    this.findMyLocation();
    this.getMeetups();
  }

  private getMeetups() {
    this.meetups$ = this.meetupsService.getUpcomingMeetups(0, 25, 'any', 'response');
  }

  findMyLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.setCookies(this.lat, this.lng);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  checkCookies() {
    this.lat = Number(CookieService.getCookie("latitude"));
    this.lng = Number(CookieService.getCookie("longitude"));
    if (this.lat == 0 && this.lng == 0) {
      this.lat = 56;
      this.lng = 11;
      this.zoom = 8;
    } else {
      this.zoom = 14;
    }

  }

  setCookies(lat: number, lng: number): any {
    CookieService.setCookie("latitude", lat + "", 3, "")
    CookieService.setCookie("longitude", lng + "", 3, "")
  }

}
