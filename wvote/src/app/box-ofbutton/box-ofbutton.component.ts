import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-box-ofbutton",
  templateUrl: "./box-ofbutton.component.html",
  styleUrls: ["./box-ofbutton.component.scss"]
})
export class BoxOfbuttonComponent implements OnInit {
  switcher = { for: false, against: false, abstention: false };

  constructor() {}

  ngOnInit() {}

  getValueByKey(key) {
    return this.switcher[key];
  }
}
