import { Component, OnInit } from "@angular/core";
import { FirebaseRTDBService } from "../service/firebase-rtdb.service";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"]
})
export class AboutComponent implements OnInit {
  listOfVOtes: any[];
  statisticForVOtes: any[] = [];

  constructor(public db: FirebaseRTDBService) {
    setTimeout(() => {
      this.listOfVOtes = this.db.getAllVOtes();
    }, 1000);
  }

  ngOnInit() {
    setTimeout(() => {
      for (let i = 0; i < this.listOfVOtes.length; i++) {
        this.statisticForVOtes.push(
          this.db.getStatisticForVote(this.listOfVOtes[i])
        );
      }
    }, 1000);
  }
}
