import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../services/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  pict = "assets/mount.jpg";
  vile = "assets/wil.jpg";
  constructor(private authService: AuthService) {}

  ngOnInit() {}
}
