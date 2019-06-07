import { Key } from "protractor";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MyButtonComponent } from "../my-button/my-button.component";
import { FirebaseRTDBService } from "../service/firebase-rtdb.service";
import { defineBase } from "@angular/core/src/render3";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { isUndefined, isNull } from "util";
import { extendsDirectlyFromObject } from "@angular/core/src/render3/jit/directive";

@Component({
  selector: "app-resolution",
  templateUrl: "./resolution.component.html",
  styleUrls: ["./resolution.component.scss"]
})
export class ResolutionComponent implements OnInit {
  objectKeys = Object.keys;
  idPoll: string = "2000";
  votesFor: number = 0;
  votesAgainst: number = 0;
  votesAbstention: number = 0;
  @ViewChild(MyButtonComponent) mybutton: MyButtonComponent;
  buttonId: string;
  buttonOn: boolean = false;
  owners: any[];
  objectOfBase: AngularFireDatabase;
  // list_of_votes: { any }[] = [];

  constructor(public db: FirebaseRTDBService) {
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
      list_of_votes: { [this.idPoll]: "true" }
    });
    tempObject.valueChanges();

    // let temp = { [owner.id]: "for" };
    // this.list_of_votes.push(temp);
    // this.list_of_votes.forEach(n => console.log(n));
  }

  updateAgainsActiv(owner) {
    let tempObject = this.db.getOwner(owner.id);
    tempObject.update({ list_of_votes: { "2019_2": "false" } });
    tempObject.valueChanges();
  }

  updateAstentionActiv(owner) {
    let tempObject = this.db.getOwner(owner.id);
    tempObject.update({
      list_of_votes: { "2019_2": "false" }
    });
    tempObject.valueChanges();
  }

  getValueOfVoteFromService(owner) {
    console.log("-------------------------");
    console.log("AAA z resolutions  : " + this.db.getValueOfVote(owner.id));
    console.log(
      "AAA typ z resolutions : " + typeof this.db.getValueOfVote(owner.id)
    );
    if (true) {
      this.buttonOn = true;
    } else {
      this.buttonOn = false;
    }
  }

  getKeys(obj) {
    return Object.keys(obj);
  }

  getValues(obj) {
    if (obj == undefined || obj == null) {
      return false;
    } else if (Object.values(obj)[0] == "true") {
      return true;
    }
    return false;
  }
}

// <div>
// {{ owner.id }} :{{ owner.fullname }} : {{ owner.property }} :
// {{ owner.participation }} :-: {{ getKeys(owner.list_of_votes) }} : :{{
//   getValues(owner.list_of_votes)
// }}
// +
// </div>
