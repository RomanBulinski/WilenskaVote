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

  listOfVOtes: any[];
  statisticForVOtes: any[] = [];

  constructor(public db: FirebaseRTDBService) {
    this.listOfVOtes = this.db.getAllVOtes();
  }

  ngOnInit() {
    for (let i = 0; i < this.listOfVOtes.length; i++) {
      console.log(this.listOfVOtes[i]);
      console.log(this.db.getStatisticForVote(this.listOfVOtes[i]));
      this.statisticForVOtes.push(
        this.db.getStatisticForVote(this.listOfVOtes[i])
      );
    }
  }
}
