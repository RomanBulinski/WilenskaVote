import { Component, OnInit } from "@angular/core";
import { OwnersServiceService } from "../owners/owners-service.service";
import { MyButtonComponent } from "../my-button/my-button.component";

@Component({
  selector: "app-resolution",
  templateUrl: "./resolution.component.html",
  styleUrls: ["./resolution.component.scss"]
})
export class ResolutionComponent implements OnInit {
  owners;
  votesFor: number = 0;
  votesAgainst: number = 0;
  votesAbstention: number = 0;
  constructor(service: OwnersServiceService) {
    this.owners = service.getOwners();
  }

  ngOnInit() {}

  incrementVFor(value: any) {
    this.votesFor = this.votesFor + value;
  }

  incrementVAgainst(value: any) {
    this.votesAgainst = this.votesAgainst + value;
  }

  incrementVAbstention(value: any) {
    this.votesAbstention = this.votesAbstention + value;
  }
}
