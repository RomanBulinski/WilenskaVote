import { Component, OnInit, ViewChild } from "@angular/core";
import { MyButtonComponent } from "../my-button/my-button.component";
import { FirebaseRTDBService } from "../service/firebase-rtdb.service";

@Component({
  selector: "app-resolution",
  templateUrl: "./resolution.component.html",
  styleUrls: ["./resolution.component.scss"]
})
export class ResolutionComponent implements OnInit {
  votesFor: number = 0;
  votesAgainst: number = 0;
  votesAbstention: number = 0;
  @ViewChild(MyButtonComponent) mybutton: MyButtonComponent;
  buttonId: string;
  buttonOn: boolean;

  // constructor(service: OwnersServiceService) {
  //   this.owners = service.getOwners();
  // }

  owners: any[];

  constructor(db: FirebaseRTDBService) {
    this.owners = db.getOwners();
  }

  showDataFromChiled() {}

  ngOnInit() {}

  incrementVFor(value: any) {
    this.votesFor = this.votesFor + value;
    console.log(this.votesFor);
  }

  decrementVFor(value: any) {
    this.votesFor = this.votesFor - value;
  }

  incrementVAgainst(value: any) {
    this.votesAgainst = this.votesAgainst + value;
  }
  decrementVAgainst(value: any) {
    this.votesAgainst = this.votesAgainst - value;
  }

  incrementVAbstention(value: any) {
    this.votesAbstention = this.votesAbstention + value;
  }
  decrementVAbstention(value: any) {
    this.votesAbstention = this.votesAbstention - value;
  }

  receiveButtonId($event) {
    this.buttonId = $event;
  }

  receiveButtonOn($event) {
    this.buttonOn = JSON.parse($event);
  }
}
