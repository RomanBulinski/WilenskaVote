import { Component } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Subscription } from "rxjs";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Key } from "protractor";
import { FirebaseRTDBService } from "../service/firebase-rtdb.service";

@Component({
  selector: "app-owners",
  templateUrl: "./owners.component.html",
  styleUrls: ["./owners.component.scss"]
})
export class OwnersComponent {
  observable$: Observable<any[]>;
  owners$: AngularFireList<any>;
  owners: any[];
  newOwners$: any;

  // owner;
  // owners: any[];
  // subscription: Subscription;
  // constructor(db: AngularFireDatabase) {
  // constructor(private db: AngularFireDatabase) {
  constructor(private db: FirebaseRTDBService) {
    // this.owners$ = db.list("/");
    this.owners$ = db.getOwnersAngularFireList();
    this.owners = db.getOwners();
    this.observable$ = this.owners$.valueChanges();
    // this.observable$ = db.list("/");
    // console.log(this.observable$);

    // this.observable$ = this.owners$.snapshotChanges().map(changes => {
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // });

    // db.list("/")
    //   .valueChanges()
    //   .subscribe(owners => {
    //     this.owners = owners;
    //   });

    // this.newOwners$ = db.list("/").snapshotChanges();
    // this.newOwners$ = this.newOwners$.snapshotChanges().map(changes => {
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // });
  }

  add(owner: HTMLInputElement) {
    console.log("dodaje");
    this.owners$.set(owner.value, {
      // fullname: "gargamel",
      fullname: owner.value,
      key: owner.checked,
      price: 150,
      isLive: true,
      sections: [
        { title: "Compoenentsssss" },
        { title: "Directives" },
        { title: "TEmplate" }
      ]
    });
    owner.value = "AAA";
  }

  update(owner) {
    this.db.object(owner.fullname).update({
      property: owner.property + "-------------"
    });
  }

  getInfo(owner) {
    // console.log(Object.keys(owner));
    // console.log(Object.assign(owner));
    // console.log(Object.values(owner));
    console.log("============================");
    // console.log("object from keys : " + Object.keys(owner));
    console.log("fullname : " + owner.fullname);
    console.log("============================");
    // console.log(owner.getKey);
    // console.log("entries : " + Object.entries(owner));
    // console.log("values : " + Object.values(owner));
    // this.owners.forEach(n => console.log(n.index));

    // this.owners$.snapshotChanges().subscribe(owners => {
    //   owners.forEach(owner => {
    //     console.log("-----------------------------------");
    //     console.log(owner.type);
    //     console.log("klucz : " + owner.key);
    //     console.log(owner.payload.val());
    //     console.log("-----------------------------------");
    //   });
    // });
  }
}
