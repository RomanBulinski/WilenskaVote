import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ContService } from "./cont.service";
import * as emailjs from "emailjs-com";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"]
})
export class ContactComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;

  templateParams = {
    name: "James",
    notes: "Check this out!"
  };

  constructor(
    private formBuilder: FormBuilder,
    private contService: ContService
  ) {}

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      name: ["", Validators.required],
      message: ["", Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.messageForm.invalid) {
      return;
    }
    this.success = true;

    console.log("wyyyysylam");
    emailjs
      .sendForm("wilenskaId", "gmail", "#myForm", "user_DpWteY7OokMzCVhDLY0yZ")
      .then(
        function(response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function(err) {
          console.log("FAILED...", err);
        }
      );
  }
}
