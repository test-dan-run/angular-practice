import { Component, OnInit, Inject } from "@angular/core";

import { Leader } from "../shared/leader";
import { LeaderService } from "../services/leader.service";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"]
})
export class AboutComponent implements OnInit {
  leaders: Leader[];
  selectedLeader: Leader;
  leaderErrMess: string;

  constructor(
    private leaderService: LeaderService,
    @Inject("BaseURL") private BaseURL
  ) {}

  ngOnInit() {
    this.leaderService
      .getLeaders()
      .subscribe(
        leader => (this.leaders = leader),
        errmess => (this.leaderErrMess = <any>errmess.message)
      );
  }

  onSelect(leader: Leader) {
    this.selectedLeader = leader;
  }
}
