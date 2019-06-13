import { Component, OnInit } from "@angular/core";
import { DataserviceService } from "../servicedata/dataservice.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
  appTitle = "Wilenska5";

  message2: string;

  constructor() // private data: DataserviceService
  {}

  ngOnInit() {
    //   this.data.currentMessage.subscribe(message2 => (this.message2 = message2));
    // }
  }
}
