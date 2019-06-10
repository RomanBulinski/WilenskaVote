import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { DataserviceService } from "../servicedata/dataservice.service";

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
  @Input() ownerId: string;
  @Output() messageEventID = new EventEmitter<string>();
  @Output() messageEventON = new EventEmitter<string>();

  idDAta = { ownerId: this.buttonID, buttonLabel: this.buttonLabel };

  // message: string;
  message: string;
  // message: [];

  constructor(private data: DataserviceService) {}

  ngOnInit() {
    this.data.currentMessage.subscribe(message => (this.message = message));
  }

  checkmessage(message) {
    let str = message;
    let splitted = str.split(" ");

    let owId = splitted[0];
    let butLebel = splitted[1];

    if (owId == this.ownerId && butLebel != this.buttonLabel) {
      this.buttonOn = false;
    }
  }

  allFunctions() {
    this.changeColor();
    this.sendButtonIDMessage();
    this.sendButtonOnMessage();
    this.newMessage();
    this.checkmessage(this.message);
  }

  newMessage() {
    this.data.changeMessage(this.ownerId + " " + this.buttonLabel);
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
