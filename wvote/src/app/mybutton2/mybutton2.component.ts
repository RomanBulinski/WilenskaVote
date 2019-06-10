import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-mybutton2",
  templateUrl: "./mybutton2.component.html",
  styleUrls: ["./mybutton2.component.scss"]
})
export class Mybutton2Component implements OnInit {
  @Input() buttonOn: boolean;
  @Input() buttonLabel: string;

  constructor() {}

  ngOnInit() {}

  changeColor() {
    if (this.buttonOn == true) {
      this.buttonOn = false;
    } else if (this.buttonOn == false) {
      this.buttonOn = true;
    }
  }
}
