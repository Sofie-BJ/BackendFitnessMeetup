import { Component, OnInit } from '@angular/core';
import { Meetup, User, Location, MeetupsService, SportsService } from '../api';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-new-meetup',
  templateUrl: './new-meetup.component.html',
  styleUrls: ['./new-meetup.component.css'],
  providers: [MeetupsService, SportsService, LoginService]
})
export class NewMeetupComponent implements OnInit {


  title: string;
  description: string;
  date: Date;
  sport: string;

  sports$: Observable<string[]>;
  

  constructor(private meetupsService: MeetupsService,
    private sportsService: SportsService, private loginService: LoginService) { }


  ngOnInit() {
    this.sports$ = this.sportsService.getAllSports();
  }


  addMeetup() {
    var userid = ""; 
    console.log("Add meetup is called!");


    this.loginService.logitStatus().subscribe(authResponse => {
      userid = authResponse.authResponse.userID;
    });

    console.log(userid);

    let meetup: Meetup = {
      id: 1, description: this.description, location: { lat: 100, lng: 100 } as Location, sport: this.sport, owner: { id: userid, email: "test@test.com", name: "Niels test user" } as User, title: this.title, date: this.date, participants: []
    }

    this.meetupsService.addMeetup(meetup).subscribe(value => {
      console.log("Addmeetup on API was called!");
    });


  }
  



}
