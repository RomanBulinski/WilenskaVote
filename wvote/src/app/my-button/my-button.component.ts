import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-my-button",
  templateUrl: "./my-button.component.html",
  styleUrls: ["./my-button.component.scss"]
})
export class MyButtonComponent implements OnInit {
  condition: boolean = false;

  @Input() buttonLabel: string;

  constructor() {}

  ngOnInit() {}

  changeColor() {
    if (this.condition == true) {
      this.condition = false;
    } else if (this.condition == false) {
      this.condition = true;
    }
  }
}
