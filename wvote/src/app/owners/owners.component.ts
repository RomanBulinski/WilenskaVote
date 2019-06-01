import { Component } from "@angular/core";
// import { OwnersServiceService } from "./owners-service.service";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
// import { Subscription } from "rxjs";
import { Observable } from "rxjs";

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
  // owners$: Observable<any[]>;
  // owners$: AngularFireList<any[]>;
  owners: any[];

  // owner;
  // owners: any[];
  // subscription: Subscription;
  // constructor(db: AngularFireDatabase) {
  constructor(private db: AngularFireDatabase) {
    // this.owners$ = db.list("/").valueChanges();
    // this.owners$ = db.list("/");
    // this.owners$ = db.list("/");

    db.list("/")
      .valueChanges()
      .subscribe(owners => {
        this.owners = owners;
        console.log("druga szansa : " + this.owners);
      });
  }

  add(owner: HTMLInputElement) {
    console.log("dodaje");
    this.owners.push({
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
    console.log("klucz obiektu : " + owner.fullname);
    this.db.object(owner.fullname).update({
      fullname: owner.fullname + "zorro",
      property: owner.property + "update++"
    });
  }

  getInfo(owner) {
    console.log("fullname : " + owner.fullname);
    console.log("id obiektu : " + owner.$id);
    console.log("value obiektu : " + owner.index);
    console.log("klucz obiektu : " + owner.$key);
  }

  // constructor(db: AngularFireDatabase) {
  //   this.subscription = db
  //     .list("/")
  //     .valueChanges()
  //     .subscribe(owners => {
  //       this.owners = owners;
  //       console.log(this.owners);
  //     });
  // }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
