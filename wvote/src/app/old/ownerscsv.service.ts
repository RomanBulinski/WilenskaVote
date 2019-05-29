// import { Injectable } from '@angular/core';

import { AboutComponent } from "../about/about.component";

// @Injectable({
//   providedIn: 'root'
// })

export class OwnerscsvService {
  aboutComponent: AboutComponent;

  // constructor() { }
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

  getOwners() {
    return this.aboutComponent.getListOfOwners();
    // return [this.Owner1, this.Owner2, this.Owner3, this.Owner4];
  }
}
