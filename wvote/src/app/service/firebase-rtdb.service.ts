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

    console.log("jestme w costruktorze ");
  }

  createOwner(_fullname, owner: Owner): void {
    this.owners$.set(_fullname, owner);
    this.db.object(_fullname).update({
      fullname: _fullname
    });
  }

  getObjectForUpdate(id: string) {
    console.log("call from firbase funkcja for update : ");
    return this.db.object(id);
  }

  getOwners() {
    return this.owners;
  }

  getOwnersAngularFireList() {
    return this.owners$;
  }
}
