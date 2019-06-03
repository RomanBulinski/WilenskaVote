import { Component, OnInit } from "@angular/core";

import { AngularFireDatabase } from "angularfire2/database";
import { FirebaseRTDBService } from "../service/firebase-rtdb.service";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"]
})
export class AboutComponent implements OnInit {
  owners: any[];

  constructor(db: FirebaseRTDBService) {
    this.owners = db.getOwners();
  }

  ngOnInit() {}
}
