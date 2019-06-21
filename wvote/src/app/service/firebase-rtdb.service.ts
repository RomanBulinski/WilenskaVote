import { map } from "rxjs/operators";
import { Owner } from "./../owners/owner";
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs";
import { defineBase } from "@angular/core/src/render3";

@Injectable({
  providedIn: "root"
})
export class FirebaseRTDBService {
  owners: any[] = [];
  owners$: AngularFireList<Owner>;
  ownerObservable: any[];
  owner: Owner = new Owner();
  valueOfVot: string;
  total = 631842;

  //   this.afs.list("marker").valueChanges().subscribe( (data: any) => {
  //     data.forEach(item => {
  //       console.log("Lat: "+item.lat+" Lng: "+item.lng)
  //     }
  // });

  constructor(public db: AngularFireDatabase) {
    // setTimeout(() => {
    //   db.list("/")
    //     .valueChanges()
    //     .subscribe((owners: any[]) => {
    //       this.owners = owners;
    //     });
    // }, 5000);

    db.list("/")
      .valueChanges()
      .subscribe((owners: any[]) => {
        this.owners = owners;
        console.log("zbieram dane");
      });

    this.owners$ = db.list("/");

    db.list("/")
      .valueChanges() // returns observable
      .subscribe(list => {
        this.ownerObservable = list;
      });
  }

  createOwner(_fullname, owner: Owner): void {
    this.owners$.set(_fullname, owner);
    this.db.object(_fullname).update({
      fullname: _fullname
    });
  }

  getOwner(ownerId: string) {
    return this.db.object(ownerId);
  }

  getOwners() {
    return this.owners;
  }

  getOwnersObservable() {
    return this.ownerObservable;
  }

  getOwnersAngularFireList() {
    return this.owners$;
  }

  getAngularFireDatabase() {
    return this.db;
  }

  getValueOfVote(ownerId: string) {
    let result;
    let itemsRef = this.db.list("/" + [ownerId] + "/list_of_votes");
    itemsRef.snapshotChanges(["child_added"]).subscribe(actions => {
      actions.forEach(action => {
        // console.log(action.type);
        // console.log(action.key);
        console.log("BBB z servisu : " + action.payload.val());
        result = action.payload.val();
      });
    });

    this.valueOfVot = result;
  }

  getInfo(ownerId: string) {
    let itemsRef = this.db.list("/" + [ownerId] + "/list_of_votes");
    itemsRef.snapshotChanges(["child_added"]).subscribe(actions => {
      actions.forEach(action => {
        console.log(action.type);
        console.log(action.key);
        console.log(action.payload.val());
      });
    });
  }

  getListOfVOtes(ownerId: string) {
    let list = [];
    let itemsRef = this.db.list("/" + [ownerId] + "/list_of_votes");
    itemsRef.snapshotChanges(["child_added"]).subscribe(actions => {
      actions.forEach(action => {
        // console.log(action.type);
        // console.log(action.key);
        // console.log(action.payload.val());
        let tempObject = {};
        tempObject[action.key] = action.payload.val();
        list.push(tempObject);
      });
    });
    return list;
  }

  getAllVOtes() {
    let votesSet = new Set();
    for (let i = 0; i < this.owners.length; i++) {
      if (Object.keys(this.owners[i]).includes("list_of_votes")) {
        let temp = Object.keys(this.owners[i]["list_of_votes"]);
        for (let j = 0; j < temp.length; j++) {
          votesSet.add(temp[j]);
        }
      }
    }
    // return Array.from(votesSet).join("<br>");
    return Array.from(votesSet);
  }

  getStatisticForVote(voteID: string) {
    let voteResult;
    let stat = { for: 0, against: 0, abstention: 0 };

    for (let i = 0; i < this.owners.length; i++) {
      if (Object.keys(this.owners[i]).includes("list_of_votes")) {
        let kesVOte = this.owners[i].list_of_votes;
        if (Object.keys(kesVOte).includes(voteID)) {
          voteResult = kesVOte[voteID];
          let temp = stat[voteResult];
          // console.log(this.owners[i].participation);
          stat[voteResult] =
            temp + (this.owners[i].participation * 100) / this.total;
        }
      }
    }
    return stat;
  }

  deletVoteFRomList(idOwner: string, idPoll) {
    let tempObject = this.db.list(
      "/" + [idOwner] + "/list_of_votes/" + [idPoll]
    );
    tempObject.remove();
  }
}
