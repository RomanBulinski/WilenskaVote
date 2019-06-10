import { Key } from "protractor";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MyButtonComponent } from "../my-button/my-button.component";
import { FirebaseRTDBService } from "../service/firebase-rtdb.service";
import { defineBase } from "@angular/core/src/render3";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { isUndefined, isNull } from "util";
import { extendsDirectlyFromObject } from "@angular/core/src/render3/jit/directive";
import { DataserviceService } from "../servicedata/dataservice.service";

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

  total = 631842;
  // @ViewChild(MyButtonComponent) mybutton: MyButtonComponent;
  buttonId: string;
  buttonOn: boolean = false;

  owners: any[];
  objectOfBase: AngularFireDatabase;

  message: string;
  // message: [];

  constructor(
    public db: FirebaseRTDBService,
    private data: DataserviceService
  ) {
    this.owners = db.getOwners();
    this.objectOfBase = db.getAngularFireDatabase();
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => (this.message = message));
    this.sumVotesFromDB();
  }

  sumVotesFromDB() {
    // this.owners.forEach(n => console.log(n.list_of_votes));

    for (let i = 0; i < this.owners.length; i++) {
      if (this.owners[i].list_of_votes != undefined) {
        let temp = this.owners[i].list_of_votes;
        let value = Object.values(temp);

        let perCent = (100 * this.owners[i].participation) / this.total;

        if (value[0] == "for") {
          this.votesFor = this.votesFor + perCent;
        }
        if (value[0] == "against") {
          this.votesAgainst = this.votesAgainst + perCent;
        }
        if (value[0] == "abstention") {
          this.votesAbstention = this.votesAbstention + perCent;
        }
      }
    }
  }

  receiveFor($event) {
    this.votesFor = this.votesFor + (100 * JSON.parse($event)) / this.total;
  }
  receiveAgainst($event) {
    this.votesAgainst =
      this.votesAgainst + (100 * JSON.parse($event)) / this.total;
  }
  receiveAbstetion($event) {
    this.votesAbstention =
      this.votesAbstention + (100 * JSON.parse($event)) / this.total;
  }

  receiveForMinus($event) {
    this.votesFor = this.votesFor - (100 * JSON.parse($event)) / this.total;
  }
  receiveAgainstMinus($event) {
    this.votesAgainst =
      this.votesAgainst - (100 * JSON.parse($event)) / this.total;
  }
  receiveAbstetionMinus($event) {
    this.votesAbstention =
      this.votesAbstention - (100 * JSON.parse($event)) / this.total;
  }

  getPoll(event) {
    const inputValue = event.target.value;
    this.idPoll = inputValue;
  }

  receiveButtonId($event) {
    this.buttonId = $event;
  }

  receiveButtonOn($event) {
    this.buttonOn = JSON.parse($event);
  }

  updateListOfVotes(owner, voteType: string) {
    let tempObject = this.db.getOwner(owner.id);
    tempObject.update({
      list_of_votes: { [this.idPoll]: voteType }
    });
    tempObject.valueChanges();
  }

  getKeys(owner) {
    return Object.keys(owner);
  }

  getValues(obj, vote: string) {
    if (obj == undefined || obj == null) {
      return false;
    } else if (Object.values(obj)[0] == vote) {
      return true;
    }
    return false;
  }

  getList(obj) {
    if (obj == undefined || obj == null) {
      return false;
    } else {
      return obj;
    }
  }
}
