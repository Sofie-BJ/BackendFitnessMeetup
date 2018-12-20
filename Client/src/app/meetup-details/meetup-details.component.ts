import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Meetup, MeetupsService, User } from "../api";
import { LoginService } from "../login.service";

@Component({
  selector: "app-meetup-details",
  templateUrl: "./meetup-details.component.html",
  styleUrls: ["./meetup-details.component.css"],
  providers: [MeetupsService, LoginService]
})
export class MeetupDetailsComponent implements OnInit, OnDestroy {
  meetup: Meetup;
  userId: string;
  private routeSubscription: any;
  isParticipant: boolean;

  constructor(
    private route: ActivatedRoute,
    private meetupsService: MeetupsService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    //1: Get id of meetup to display
    this.routeSubscription = this.route.params.subscribe(params => {
      //2: Fetch details on that meetup
      console.log("id " + params["id"]);
      console.log(params);

      this.fetchMeetup(+params["id"]);
    });
  }

  private fetchMeetup(meetupId: number) {
    this.meetupsService.getMeetup(meetupId).subscribe(params => {
      this.meetup = params;

      //3: Determine the id of the user
      this.loginService.logitStatus().subscribe(authResponse => {
        this.userId = authResponse.authResponse.userID;

        //4: Determine if the user is already a participant
        this.isParticipant = this.isAParticipant(this.userId);
      });
    });
  }

  isAParticipant(userID: string): boolean {
    if (this.meetup.participants == null) return false;

    return this.meetup.participants.some(function(user, index) {
      return user.id == userID;
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  joinMeetup() {
    this.meetupsService
      .addParticipant(this.meetup.id, {
        id: this.userId,
        name: "unused",
        email: "unused"
      } as User)
      .subscribe(params => {
        this.fetchMeetup(this.meetup.id);
      });
  }
}
