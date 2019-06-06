import { Key } from "protractor";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MyButtonComponent } from "../my-button/my-button.component";
import { FirebaseRTDBService } from "../service/firebase-rtdb.service";
import { defineBase } from "@angular/core/src/render3";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Component({
  selector: "app-resolution",
  templateUrl: "./resolution.component.html",
  styleUrls: ["./resolution.component.scss"]
})
export class ResolutionComponent implements OnInit {
  idPoll: string = "nie podano poll id";
  votesFor: number = 0;
  votesAgainst: number = 0;
  votesAbstention: number = 0;
  @ViewChild(MyButtonComponent) mybutton: MyButtonComponent;
  buttonId: string;
  buttonOn: boolean;
  owners: any[];
  objectOfBase: AngularFireDatabase;

  constructor(private db: FirebaseRTDBService) {
    this.owners = db.getOwners();
    this.objectOfBase = db.getAngularFireDatabase();
  }

  ngOnInit() {}

  getPoll(event) {
    const inputValue = event.target.value;
    this.idPoll = inputValue;
  }

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
    let tempObject = this.db.getOwner(owner.id);
    tempObject.update({
      list_of_votes: { [this.idPoll]: "for" }
    });
    console.log(owner.list_of_votes);
    tempObject.valueChanges();
  }

  updateAgainsActiv(owner) {
    let tempObject = this.db.getOwner(owner.id);
    tempObject.update({ list_of_votes: { "2019_2": "against" } });
  }

  updateAstentionActiv(owner) {
    let tempObject = this.db.getOwner(owner.id);
    tempObject.update({
      list_of_votes: { "2019_2": "astention" }
    });
  }

  getValueOfVoteFromService(owner) {
    let valueOfVote = this.db.getValueOfVote(owner.id, this.objectOfBase);
    console.log(valueOfVote);
  }
}
