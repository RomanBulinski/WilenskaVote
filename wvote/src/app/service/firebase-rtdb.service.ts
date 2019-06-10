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
  owners: any[];
  owners$: AngularFireList<Owner>;
  ownerObservable: any[];
  owner: Owner = new Owner();
  valueOfVot: string;

  constructor(public db: AngularFireDatabase) {
    db.list("/")
      .valueChanges()
      .subscribe(owners => {
        this.owners = owners;
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
}
