import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class OwnersServiceService {
  peopleInJSON = [];
  // http: HttpClient;

  constructor(private http: HttpClient) {
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

  Owner1 = {
    ownerId: 1,
    fullname: "Tom Segev",
    property: 1,
    participation: 1.21
  };

  Owner2 = {
    ownerId: 2,
    fullname: "Zenek Kwiatkowski",
    property: 2,
    participation: 0.73
  };

  Owner3 = {
    ownerId: 3,
    fullname: "Jozek Cyrankiewicz",
    property: 3,
    participation: 0.93
  };

  Owner4 = {
    ownerId: 4,
    fullname: "Wiesik Gazda",
    property: 4,
    participation: 1.77
  };

  Owner5 = {
    ownerId: 5,
    fullname: "Wiesia Baryła",
    property: 5,
    participation: 1.03
  };

  Owner6 = {
    ownerId: 6,
    fullname: "Zanek Martyniuk",
    property: 6,
    participation: 0.84
  };

  getOwners() {
    return this.peopleInJSON;
    // return [
    //   this.Owner1,
    //   this.Owner2,
    //   this.Owner3,
    //   this.Owner4,
    //   this.Owner5,
    //   this.Owner6
    // ];
  }
}
