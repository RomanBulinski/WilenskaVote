import { Component, OnInit } from "@angular/core";
import { OwnersServiceService } from "./owners-service.service";

@Component({
  selector: "app-owners",
  templateUrl: "./owners.component.html",
  styleUrls: ["./owners.component.scss"]
})
export class OwnersComponent implements OnInit {
  owners;

  constructor(service: OwnersServiceService) {
    this.owners = service.getOwners();
    console.log("xxxxxxxxxxxxxxx" + this.owners);
  }

  ngOnInit() {}
}
