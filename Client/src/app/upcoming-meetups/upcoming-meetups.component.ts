import { Component, OnInit } from '@angular/core';
import { Meetup, MeetupsService, SportsService } from '../api';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-upcoming-meetups',
  templateUrl: './upcoming-meetups.component.html',
  styleUrls: ['./upcoming-meetups.component.css'],
  providers: [MeetupsService, SportsService]
})
export class UpcomingMeetupsComponent implements OnInit {

  sports$: Observable<string[]>;
  meetups$: Observable<HttpResponse<Meetup[]>>;

  sport: string = 'any'
  offset: number = 0
  count: number = 5

  constructor(private meetupsService: MeetupsService,
    private sportsService: SportsService) { }

  ngOnInit() {
    this.sports$ = this.sportsService.getAllSports();
    this.getMeetups();
  }

  nextClick() {
    this.offset += this.count;
    this.getMeetups();
  }

  prevClick() {
    this.offset -= this.count;
    if (this.offset < 0) {
      this.offset = 0;
    }
    this.getMeetups();
  }

  applyFilters() {
    this.getMeetups()
  }

  private getMeetups() {
    this.meetups$ = this.meetupsService.getUpcomingMeetups(this.offset, this.count, this.sport == 'any' ? null : this.sport, 'response');
  }
}
