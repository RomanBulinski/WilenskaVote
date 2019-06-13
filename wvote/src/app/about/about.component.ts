import { Component, OnInit } from "@angular/core";

import { AngularFireDatabase } from "angularfire2/database";
import { FirebaseRTDBService } from "../service/firebase-rtdb.service";
import { DataserviceService } from "../servicedata/dataservice.service";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"]
})
export class AboutComponent implements OnInit {
  // message2: string;

  listOfVOtes;

  constructor(
    // private data: DataserviceService,
    public db: FirebaseRTDBService
  ) {
    this.listOfVOtes = this.db.getAllVOtes();
  }

  ngOnInit() {
    // this.data.currentMessage.subscribe(message2 => (this.message2 = message2));
  }
}
