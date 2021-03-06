import { Component } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Subscription } from "rxjs";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Key } from "protractor";
import { FirebaseRTDBService } from "../service/firebase-rtdb.service";
import { Owner } from "./../owners/owner";

@Component({
  selector: "app-owners",
  templateUrl: "./owners.component.html",
  styleUrls: ["./owners.component.scss"]
})
export class OwnersComponent {
  observable$: Observable<any[]>;
  owners$: AngularFireList<Owner>;
  owners: any[];
  newOwners$: any;
  owner: Owner = new Owner();
  ownerName;
  listOfVOtes;

  constructor(private db: FirebaseRTDBService) {
    this.owners$ = db.getOwnersAngularFireList();
    this.owners = db.getOwners();
    this.observable$ = this.owners$.valueChanges();
  }

  add(owner: HTMLInputElement) {
    this.db.createOwner(owner.value, this.owner);
    owner.value = "dodane";
  }

  getInfoVotes(name, list) {
    this.getVotes(list);
    this.ownerName = name;
  }

  getVotes(data) {
    if (data != undefined) {
      let temp = "";
      let tempkeys = Object.keys(data);
      for (let i = 0; i < tempkeys.length; i++) {
        temp = temp + tempkeys[i] + " : " + data[tempkeys[i]] + "<br>";
      }
      this.listOfVOtes = temp;
    } else {
      this.listOfVOtes = "there is no votes !!!";
    }
  }

  // update(owner) {
  //   this.db.getOwner(owner.fullname).update({
  //     list_of_votes: { "2019_1": "for", "2019_2": "against" }
  //   });
  //   console.log("try update !!!");
  // }

  getInfo(owner) {
    console.log("============================");
    this.db.getInfo(owner.id);

    // console.log(Object.keys(owner));
    // console.log(Object.assign(owner));
    // console.log(Object.values(owner));

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

  // add2(owner: HTMLInputElement) {
  //   console.log("dodaje");
  //   this.owners$.set(owner.value, {
  //     // fullname: "gargamel",
  //     fullname: owner.value,
  //     key: owner.checked,
  //     price: 150,
  //     isLive: true,
  //     sections: [
  //       { title: "Compoenentsssss" },
  //       { title: "Directives" },
  //       { title: "TEmplate" }
  //     ]
  //   });
  //   owner.value = "AAA";
  // }
}
