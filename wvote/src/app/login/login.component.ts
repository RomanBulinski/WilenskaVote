import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../services/auth.service";

import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;

  constructor(private router: Router, private authService: AuthService) {}

  signIn(credentials) {
    this.authService.login(credentials).subscribe(result => {
      if (result) this.router.navigate(["/"]);
      else this.invalidLogin = true;
    });
  }

  ngOnInit() {}
}
