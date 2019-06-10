import { Key } from "protractor";
import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { FirebaseRTDBService } from "../service/firebase-rtdb.service";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Component({
  selector: "app-box-ofbutton",
  templateUrl: "./box-ofbutton.component.html",
  styleUrls: ["./box-ofbutton.component.scss"]
})
export class BoxOfbuttonComponent implements OnInit {
  switcher = { for: false, against: false, abstention: false };

  votesFor: number = 0;
  votesAgainst: number = 0;
  votesAbstention: number = 0;

  votesForMinus: number = 0;
  votesAgainstMinus: number = 0;
  votesAbstentionMinus: number = 0;

  @Input() participation: number;
  @Input() id: string;
  @Input() listOfVOtes;

  @Output() messageEventVotesFor = new EventEmitter<string>();
  @Output() messageEventVotesAgainst = new EventEmitter<string>();
  @Output() messageEventVotesAbstention = new EventEmitter<string>();

  @Output() messageEventVotesForMinus = new EventEmitter<string>();
  @Output() messageEventVotesAgainstMinus = new EventEmitter<string>();
  @Output() messageEventVotesAbstentionMinus = new EventEmitter<string>();

  owners: any[];
  objectOfBase: AngularFireDatabase;
  idPoll: string = "2000";

  constructor(public db: FirebaseRTDBService) {
    this.owners = db.getOwners();
    this.objectOfBase = db.getAngularFireDatabase();
  }

  ngOnInit() {
    this.getValueOfVote("for");
    this.getValueOfVote("against");
    this.getValueOfVote("abstention");
  }

  getValueOfVote(vote: string) {
    if (this.listOfVOtes == undefined || this.listOfVOtes == null) {
      console.log("ther is no list of votes");
    } else if (Object.values(this.listOfVOtes)[0] == vote) {
      this.switcher[vote] = true;
    }
  }

  updateListOfVotes(voteType: string) {
    let tempObject = this.db.getOwner(this.id);
    tempObject.update({
      list_of_votes: { [this.idPoll]: voteType }
    });
    tempObject.valueChanges();
  }

  delateList() {
    let tempObject = this.db.getOwner(this.id + "/list_of_votes/");
    tempObject.remove();
  }

  sendButtonVotesFor() {
    this.messageEventVotesFor.emit(String(this.votesFor));
  }
  sendButtonVotesAgainst() {
    this.messageEventVotesAgainst.emit(String(this.votesAgainst));
  }
  sendButtonvotesAbstention() {
    this.messageEventVotesAbstention.emit(String(this.votesAbstention));
  }

  sendButtonVotesForMinus() {
    this.messageEventVotesForMinus.emit(String(this.votesForMinus));
  }
  sendButtonVotesAgainstMinus() {
    this.messageEventVotesAgainstMinus.emit(String(this.votesAgainstMinus));
  }
  sendButtonvotesAbstentionMinus() {
    this.messageEventVotesAbstentionMinus.emit(
      String(this.votesAbstentionMinus)
    );
  }

  increment(voteType: string) {
    if (voteType == "for") {
      this.votesFor = Number(this.participation);
    }
    if (voteType == "against") {
      this.votesAgainst = Number(this.participation);
    }
    if (voteType == "abstention") {
      this.votesAbstention = Number(this.participation);
    }
  }

  decrement(voteType: string) {
    if (voteType == "for") {
      this.votesForMinus = this.participation;
    }
    if (voteType == "against") {
      this.votesAgainstMinus = this.participation;
    }
    if (voteType == "abstention") {
      this.votesAbstentionMinus = this.participation;
    }
  }

  getValueByKey(key) {
    return this.switcher[key];
  }

  switchButtons(voteType: string) {
    if (voteType == "for") {
      this.switcher.for = true;
      this.switcher.against = false;
      this.switcher.abstention = false;
    }
    if (voteType == "against") {
      this.switcher.for = false;
      this.switcher.against = true;
      this.switcher.abstention = false;
    }
    if (voteType == "abstention") {
      this.switcher.for = false;
      this.switcher.against = false;
      this.switcher.abstention = true;
    }
  }

  switchButtonOFF(voteType: string) {
    this.switcher[voteType] = false;
  }

  onClickMe(voteType: string) {
    if (this.getValueByKey(voteType) == false) {
      this.switchButtons(voteType);
      this.increment(voteType);
      this.updateListOfVotes(voteType);
      if (voteType == "for") {
        this.sendButtonVotesFor();
      }
      if (voteType == "against") {
        this.sendButtonVotesAgainst();
      }
      if (voteType == "abstention") {
        this.sendButtonvotesAbstention();
      }
    } else if (this.getValueByKey(voteType) == true) {
      this.switchButtonOFF(voteType);
      this.decrement(voteType);
      this.delateList();
      if (voteType == "for") {
        console.log(this.votesForMinus);
        this.sendButtonVotesForMinus();
      }
      if (voteType == "against") {
        this.sendButtonVotesAgainstMinus();
      }
      if (voteType == "abstention") {
        this.sendButtonvotesAbstentionMinus();
      }
    }
  }
}
