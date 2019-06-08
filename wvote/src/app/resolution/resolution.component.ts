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

  constructor(public db: FirebaseRTDBService) {
    this.owners = db.getOwners();
    this.objectOfBase = db.getAngularFireDatabase();
  }

  ngOnInit() {}

  getPoll(event) {
    const inputValue = event.target.value;
    this.idPoll = inputValue;
  }

  increment(value: number, voteType: string) {
    if (voteType == "for") {
      this.votesFor = this.votesFor + Number(value);
    }
    if (voteType == "against") {
      this.votesAgainst = this.votesAgainst + Number(value);
    }
    if (voteType == "abstention") {
      this.votesAbstention = this.votesAbstention - Number(value);
    }
  }

  decrement(value: number, voteType: string) {
    if (voteType == "for") {
      this.votesFor = this.votesFor - Number(value);
    }
    if (voteType == "against") {
      this.votesAgainst = this.votesAgainst - Number(value);
    }
    if (voteType == "abstention") {
      this.votesAbstention = this.votesAbstention - Number(value);
    }
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
    tempObject.valueChanges();
  }

  updateAgainsActiv(owner) {
    let tempObject = this.db.getOwner(owner.id);
    tempObject.update({ list_of_votes: { [this.idPoll]: "against" } });
    tempObject.valueChanges();
  }

  updateAstentionActiv(owner) {
    let tempObject = this.db.getOwner(owner.id);
    tempObject.update({
      list_of_votes: { [this.idPoll]: "abstention" }
    });
    tempObject.valueChanges();
  }

  getKeys(obj) {
    return Object.keys(obj);
  }

  getValues(obj, vote: string) {
    if (obj == undefined || obj == null) {
      return false;
    } else if (Object.values(obj)[0] == vote) {
      return true;
    }
    return false;
  }
}
