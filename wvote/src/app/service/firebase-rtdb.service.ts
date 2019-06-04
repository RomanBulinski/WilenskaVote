import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: "root"
})
export class FirebaseRTDBService {
  owners: any[];
  owners$: AngularFireList<any>;
  dibi: AngularFireDatabase;

  constructor(db: AngularFireDatabase) {
    db.list("/")
      .valueChanges()
      .subscribe(owners => {
        this.owners = owners;
      });
    this.owners$ = db.list("/");
    this.dibi = db;
  }

  getOwners() {
    return this.owners;
  }

  getOwnersAngularFireList() {
    return this.owners$;
  }

  tryObject() {
    console.log(this.owners.keys());
  }

  object(ownerfullname: string) {
    return this.dibi.object(ownerfullname);
  }
}
