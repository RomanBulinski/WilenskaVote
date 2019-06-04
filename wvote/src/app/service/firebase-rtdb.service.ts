import { Owner } from "./../owners/owner";
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: "root"
})
export class FirebaseRTDBService {
  dibi: AngularFireDatabase;
  owners: any[];
  owners$: AngularFireList<Owner>;

  constructor(db: AngularFireDatabase) {
    db.list("/")
      .valueChanges()
      .subscribe(owners => {
        this.owners = owners;
      });
    this.owners$ = db.list("/");
    this.dibi = db;
  }

  createOwner(_fullname, owner: Owner): void {
    this.owners$.set(_fullname, owner);
    this.dibi.object(_fullname).update({
      fullname: _fullname
    });
  }

  update(ownerfullname: string) {
    return this.dibi.object(ownerfullname);
  }

  getOwners() {
    return this.owners;
  }

  getOwnersAngularFireList() {
    return this.owners$;
  }
}
