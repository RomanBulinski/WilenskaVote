import { Component, OnInit, ViewChild } from "@angular/core";
import { FirebaseRTDBService } from "../service/firebase-rtdb.service";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { DataserviceService } from "../servicedata/dataservice.service";
import { STRING_TYPE } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-resolution",
  templateUrl: "./resolution.component.html",
  styleUrls: ["./resolution.component.scss"]
})
export class ResolutionComponent implements OnInit {
  objectKeys = Object.keys;
  idPoll: string = "2016_1";

  votesFor: number = 0;
  votesAgainst: number = 0;
  votesAbstention: number = 0;
  total = 631842;
  buttonId: string;
  buttonOn: boolean = false;
  owners: any[];
  objectOfBase: AngularFireDatabase;

  iDsOfvotes = new Set();
  // iDsOfvotesString: string = "";

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

  receiveIdVotesList($event) {
    if ($event != null || $event != undefined) {
      let splitted = $event.split(" ");
      for (let i = 0; i < splitted.length; i++) {
        if (splitted[i] != " ") {
          this.iDsOfvotes.add(splitted[i]);
        }
      }
    }
    // this.setToString();
  }

  // setToString() {
  //   this.iDsOfvotesString = Array.from(this.iDsOfvotes).join(" ");
  // }

  getPoll(event) {
    const inputValue = event.target.value;
    this.idPoll = inputValue;
  }

  setPoll(ele) {
    this.idPoll = ele;
    console.log(this.idPoll);
  }

  getList(obj) {
    if (obj == undefined || obj == null) {
      return false;
    } else {
      return obj;
    }
  }
}
