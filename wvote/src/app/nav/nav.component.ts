import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
  appTitle = "Wilenska5";

  message2: string;

  constructor() {}

  ngOnInit() {}
}
