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
  owners: any[];

  constructor(private db: FirebaseRTDBService) {
    this.owners = db.getOwners();
  }

  ngOnInit() {}

  incrementVFor(value: number) {
    this.votesFor = this.votesFor + Number(value);
    console.log(this.votesFor);
  }

  decrementVFor(value: number) {
    this.votesFor = this.votesFor - Number(value);
  }

  incrementVAgainst(value: number) {
    this.votesAgainst = this.votesAgainst + Number(value);
  }

  decrementVAgainst(value: number) {
    this.votesAgainst = this.votesAgainst - Number(value);
  }

  incrementVAbstention(value: number) {
    this.votesAbstention = this.votesAbstention + Number(value);
  }
  decrementVAbstention(value: number) {
    this.votesAbstention = this.votesAbstention - Number(value);
  }

  receiveButtonId($event) {
    this.buttonId = $event;
  }

  receiveButtonOn($event) {
    this.buttonOn = JSON.parse($event);
  }

  updateForActiv(owner) {
    let tempObject = this.db.getObjectForUpdate(owner.id);
    tempObject.update({
      list_of_votes: { "2019_1": "for" }
    });
  }

  updateAgainsActiv(owner) {
    let tempObject = this.db.getObjectForUpdate(owner.id);
    tempObject.update({
      list_of_votes: { "2019_1": "against" }
    });
  }

  updateAstentionActiv(owner) {
    let tempObject = this.db.getObjectForUpdate(owner.id);
    tempObject.update({
      list_of_votes: { "2019_1": "astention" }
    });
  }
}
