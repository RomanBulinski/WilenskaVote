import { Component, OnInit } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";

// import { FirebaseService } from "./firebase.service";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"]
})
export class ContactComponent implements OnInit {
  // constructor() {}

  peopleInJSON = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const ids = [];
    this.http.get("assets/wilenska03.csv", { responseType: "text" }).subscribe(
      data => {
        const lines = data.split("\n");
        lines.forEach(line => {
          var ownerJson: {
            ownerId: number;
            fullname: string;
            property: string;
            participation: string;
          } = { ownerId: 0, fullname: "", property: "", participation: "" };
          ownerJson.ownerId = ids.length + 1;
          ownerJson.fullname = line.split(",")[0];
          ownerJson.property = line.split(",")[1];
          ownerJson.participation = line.split(",")[2];
          ids.push(ownerJson);
          console.log(ownerJson);
        });
        this.peopleInJSON = ids;
      },
      error => {
        console.log(error);
      }
    );
  }
}
