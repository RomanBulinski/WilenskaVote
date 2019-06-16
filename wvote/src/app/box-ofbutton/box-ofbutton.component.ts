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

  idVotesList: string[];

  @Input() participation: number;
  @Input() id: string;
  @Input() listOfVOtes;
  @Input() idPoll;

  @Output() messageEventVotesFor = new EventEmitter<string>();
  @Output() messageEventVotesAgainst = new EventEmitter<string>();
  @Output() messageEventVotesAbstention = new EventEmitter<string>();

  @Output() messageEventVotesForMinus = new EventEmitter<string>();
  @Output() messageEventVotesAgainstMinus = new EventEmitter<string>();
  @Output() messageEventVotesAbstentionMinus = new EventEmitter<string>();

  @Output() messageEventIdVotesList = new EventEmitter<string>();

  owners: any[];
  objectOfBase: AngularFireDatabase;

  constructor(public db: FirebaseRTDBService) {
    this.owners = db.getOwners();
    this.objectOfBase = db.getAngularFireDatabase();
  }

  ngOnInit() {
    this.setSwitcher("for");
    this.setSwitcher("against");
    this.setSwitcher("abstention");
    this.getIdVotesListFromOwner();

    this.sendidVotesList();
  }

  ngOnChanges() {
    this.setSwitcher("for");
    this.setSwitcher("against");
    this.setSwitcher("abstention");
  }

  setSwitcher(vote: string) {
    if (this.listOfVOtes == undefined || this.listOfVOtes == null) {
      this.switcher = { for: false, against: false, abstention: false };
    } else if (
      Object.keys(this.listOfVOtes).includes(this.idPoll) &&
      this.listOfVOtes[this.idPoll] == vote
    ) {
      this.switcher = { for: false, against: false, abstention: false };
      this.switcher[vote] = true;
    } else if (!Object.keys(this.listOfVOtes).includes(this.idPoll)) {
      this.switcher = { for: false, against: false, abstention: false };
    }
  }

  getFromSwitcherValueByKey(key) {
    return this.switcher[key];
  }

  onClickMe(voteType: string) {
    if (this.getFromSwitcherValueByKey(voteType) == false) {
      this.switchButtons(voteType);
      this.increment(voteType);
      this.updateListOfVotes(this.idPoll, voteType);
      if (voteType == "for") {
        this.sendButtonVotesFor();
      }
      if (voteType == "against") {
        this.sendButtonVotesAgainst();
      }
      if (voteType == "abstention") {
        this.sendButtonvotesAbstention();
      }
    } else if (this.getFromSwitcherValueByKey(voteType) == true) {
      this.switchButtonOFF(voteType);
      this.decrement(voteType);
      this.db.deletVoteFRomList(this.id, this.idPoll);
      // this.deleteVoteByIdPoll();

      // this.delateList();

      if (voteType == "for") {
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

  updateListOfVotes(voteId: string, voteType: string) {
    var newList = {};
    if (this.listOfVOtes == false) {
      newList[voteId] = voteType;
    } else {
      newList = this.listOfVOtes;
      newList[voteId] = voteType;
    }
    let owner = this.db.getOwner(this.id);
    owner.update({
      list_of_votes: newList
      // list_of_votes: { [this.idPoll]: voteType, "2011": voteType }
    });
    owner.valueChanges();
  }

  // deleteVoteByIdPoll() {
  // let tempObject = this.owners[this.id].list_of_votes.idPoll;
  // console.log(this.owners[this.id].list_of_votes[this.idPoll]);
  // tempObject = "";
  // this.owners[idOwner].list_of_votes[this.idPoll] = "";
  // tempObject.remove();
  // }

  getIdVotesListFromOwner() {
    this.idVotesList = Object.keys(this.listOfVOtes);
  }

  // getListOfVotes() {
  //   this.db.getListOfVOtes(this.id);
  // }

  // delateList() {
  //   let tempObject = this.db.getOwner(this.id + "/list_of_votes/");
  //   tempObject.remove();
  // }

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

  sendidVotesList() {
    this.messageEventIdVotesList.emit(String(this.idVotesList.join(" ")));
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

  switchButtons(voteType: string) {
    if (voteType == "for") {
      this.switcher = { for: true, against: false, abstention: false };
    }
    if (voteType == "against") {
      this.switcher = { for: false, against: true, abstention: false };
    }
    if (voteType == "abstention") {
      this.switcher = { for: false, against: false, abstention: true };
    }
  }

  switchButtonOFF(voteType: string) {
    this.switcher[voteType] = false;
  }
}
