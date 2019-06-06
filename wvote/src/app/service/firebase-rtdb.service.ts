import { map } from "rxjs/operators";
import { Owner } from "./../owners/owner";
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: "root"
})
export class FirebaseRTDBService {
  owners: any[];
  owners$: AngularFireList<Owner>;
  ownerObservable: any[];
  owner: Owner = new Owner();

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
    console.log("call from firbase funkcja for update : ");
    return this.db.object(ownerId);
  }

  getOwners() {
    return this.owners;
  }

  getOwnersAngularFireList() {
    return this.owners$;
  }

  getListOfVotesFromOwner(ownerId: string) {
    return this.db.object(ownerId).valueChanges();
  }
}
