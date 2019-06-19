import { Injectable } from "@angular/core";
import * as emailjs from "emailjs-com";

@Injectable({
  providedIn: "root"
})
export class ContService {
  server;

  constructor() {
    // var email = require("./path/to/emailjs/email");
    // this.server = email.server.connect({
    //   user: "buulean",
    //   password: "XXXX",
    //   host: "smtp.your-email.com",
    //   ssl: true
    // });
  }

  sendMessage(message, emailAddrres) {
    this.server.send(
      {
        // text:    "i hope this works",
        text: message,
        // from:    "you <username@your-email.com>",
        // to:      "someone <someone@your-email.com>, another <another@your-email.com>",
        to: emailAddrres

        // cc:      "else <else@your-email.com>",
        // subject: "testing emailjs"
      },
      function(err, message) {
        console.log(err || message);
      }
    );
  }

  // send the message and get a callback with an error or details of the message that was sent
}

// Import { Component, OnInit } from "@angular/core";
// import * as emailjs from "emailjs-com";

// @Component({
//   selector: "app-contactform",
//   templateUrl: "./contactform.component.html",
//   styleUrls: ["./contactform.component.scss"]
// })
// export class ContactformComponent implements OnInit {
//   constructor() {}

//   ngOnInit() {}

//   onSubmit(templateForm: any, form: any) {
//     const templateParams = {
//       from_email: templateForm.email,
//       subject: templateForm.subject,
//       message: templateForm.message
//     };

//     emailjs
//       .send(
//         "gmail",
//         "template_gqZQnCzA",
//         templateParams,
//         "user_ZfJq9Et9cpKuBEA8cjwr9"
//       )
//       .then(response => {
//         console.log("SUCCESS!", response.status, response.text);
//         form.reset();
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }
// }
