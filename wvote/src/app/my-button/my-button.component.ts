import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-my-button",
  templateUrl: "./my-button.component.html",
  styleUrls: ["./my-button.component.scss"]
})
export class MyButtonComponent implements OnInit {
  // buttonOn: boolean = false;
  @Input() buttonOn: boolean;
  @Input() buttonLabel: string;
  @Input() buttonID: string;
  @Output() messageEventID = new EventEmitter<string>();
  @Output() messageEventON = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  allFunctions() {
    this.changeColor();
    this.sendButtonIDMessage();
    this.sendButtonOnMessage();
  }

  changeColor() {
    if (this.buttonOn == true) {
      this.buttonOn = false;
    } else if (this.buttonOn == false) {
      this.buttonOn = true;
    }
  }

  sendButtonIDMessage() {
    this.messageEventID.emit(this.buttonID);
  }

  sendButtonOnMessage() {
    this.messageEventON.emit(String(this.buttonOn));
  }
}
