import { Component } from "@angular/core";
// import { OwnersServiceService } from "./owners-service.service";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
// import { Subscription } from "rxjs";
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
  // constructor(service: OwnersServiceService) {
  //   this.owners = service.getOwners();
  // }
  // owners$;
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
    // this.observable$ = db.list("/").valueChanges();
    // console.log(this.observable$);

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
    this.owners$.push({
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
    console.log("obiekt z bazy : " + owner.name);
    // this.db.object(owner.fullname).update({
    this.db.object(owner.fullname).update({
      fullname: owner.fullname + "zorro",
      property: owner.property + "HURRA"
    });
  }

  getInfo(owner) {
    console.log("ovner xxxxx : " + Object.keys(owner));
    console.log("fullname : " + owner.fullname);
    console.log("entries : " + Object.entries(owner));
    console.log("values : " + Object.values(owner));
    // console.log("seal : " + owner.payload.key);
  }
}
