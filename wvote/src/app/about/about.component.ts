import { Component, OnInit } from "@angular/core";

import { AngularFireDatabase } from "angularfire2/database";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"]
})
export class AboutComponent implements OnInit {
  owners: any[];

  constructor(db: AngularFireDatabase) {
    db.list("/")
      .valueChanges()
      .subscribe(owners => {
        this.owners = owners;
      });
  }

  ngOnInit() {}
}
