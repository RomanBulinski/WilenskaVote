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

  receiveFor($event) {
    this.votesFor = this.votesFor + JSON.parse($event);
  }
  receiveAgainst($event) {
    this.votesAgainst = this.votesAgainst + JSON.parse($event);
  }
  receiveAbstetion($event) {
    this.votesAbstention = this.votesAbstention + JSON.parse($event);
  }

  receiveForMinus($event) {
    this.votesFor = this.votesFor - JSON.parse($event);
  }
  receiveAgainstMinus($event) {
    this.votesAgainst = this.votesAgainst - JSON.parse($event);
  }
  receiveAbstetionMinus($event) {
    this.votesAbstention = this.votesAbstention - JSON.parse($event);
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => (this.message = message));
  }

  getPoll(event) {
    const inputValue = event.target.value;
    this.idPoll = inputValue;
  }

  // increment(value: number, voteType: string) {
  //   if (voteType == "for") {
  //     this.votesFor = this.votesFor + Number(value);
  //   }
  //   if (voteType == "against") {
  //     this.votesAgainst = this.votesAgainst + Number(value);
  //   }
  //   if (voteType == "abstention") {
  //     this.votesAbstention = this.votesAbstention + Number(value);
  //   }
  // }

  // decrement(value: number, voteType: string) {
  //   if (voteType == "for") {
  //     this.votesFor = this.votesFor - Number(value);
  //   }
  //   if (voteType == "against") {
  //     this.votesAgainst = this.votesAgainst - Number(value);
  //   }
  //   if (voteType == "abstention") {
  //     this.votesAbstention = this.votesAbstention - Number(value);
  //   }
  // }

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

// <div class="row oneOwner">
// <app-my-button
//   ownerId="{{ owner.id }}"
//   buttonID="for{{ owner.id }}"
//   buttonLabel="for"
//   [buttonOn]="getValues(owner.list_of_votes, 'for')"
//   (click)="
//     buttonOn
//       ? increment(owner.participation, 'for') +
//         updateListOfVotes(owner, 'for')
//       : decrement(owner.participation, 'for')
//   "
//   (messageEventID)="receiveButtonId($event)"
//   (messageEventON)="receiveButtonOn($event)"
// ></app-my-button>
// </div>

// <div class="row oneOwner">
// <app-my-button
//   ownerId="{{ owner.id }}"
//   buttonID="against{{ owner.id }}"
//   buttonLabel="against"
//   [buttonOn]="getValues(owner.list_of_votes, 'against')"
//   (click)="
//     buttonOn
//       ? increment(owner.participation, 'against') +
//         updateListOfVotes(owner, 'against')
//       : decrement(owner.participation, 'against')
//   "
//   (messageEventID)="receiveButtonId($event)"
//   (messageEventON)="receiveButtonOn($event)"
// ></app-my-button>
// </div>

// <div class="row oneOwner">
// <app-my-button
//   ownerId="{{ owner.id }}"
//   buttonID="abstention{{ owner.id }}"
//   buttonLabel="abstention"
//   [buttonOn]="getValues(owner.list_of_votes, 'abstention')"
//   (click)="
//     buttonOn
//       ? increment(owner.participation, 'abstention') +
//         updateListOfVotes(owner, 'abstention')
//       : decrement(owner.participation, 'abstention')
//   "
//   (messageEventID)="receiveButtonId($event)"
//   (messageEventON)="receiveButtonOn($event)"
// ></app-my-button>

// </div>
