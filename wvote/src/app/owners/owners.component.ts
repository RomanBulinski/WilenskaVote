import { Component, OnInit, OnDestroy } from "@angular/core";
// import { OwnersServiceService } from "./owners-service.service";
import { AngularFireDatabase } from "angularfire2/database";
import { Subscription } from "rxjs";

@Component({
  selector: "app-owners",
  templateUrl: "./owners.component.html",
  styleUrls: ["./owners.component.scss"]
})
export class OwnersComponent implements OnDestroy {
  // constructor(service: OwnersServiceService) {
  //   this.owners = service.getOwners();
  // }

  owners$;
  // owner;
  owners: any[];
  subscription: Subscription;

  constructor(db: AngularFireDatabase) {
    this.subscription = db
      .list("/")
      .valueChanges()
      .subscribe(owners => {
        this.owners = owners;
        console.log(this.owners);
      });
    // this.owner = db.object("/1");
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
