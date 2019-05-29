// import { Injectable } from '@angular/core';
import { AboutComponent } from "../about/about.component";

// @Injectable({
//   providedIn: 'root'
// })
export class OwnersServiceService {
  // constructor() { }

  aboutComponent: AboutComponent = new AboutComponent();

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
    // return this.aboutComponent.getListOfOwners();
    return [
      this.Owner1,
      this.Owner2,
      this.Owner3,
      this.Owner4,
      this.Owner5,
      this.Owner6
    ];
    console.log("jestem z owners service service");
  }
}
