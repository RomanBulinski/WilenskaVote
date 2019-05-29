import { environment } from "./../environments/environment";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/nav.component";
import { HomeComponent } from "./home/home.component";
import { ContactComponent } from "./contact/contact.component";
import { AboutComponent } from "./about/about.component";
import { ResolutionComponent } from "./resolution/resolution.component";
import { OwnersComponent } from "./owners/owners.component";

import { OwnersServiceService } from "./owners/owners-service.service";
import { MyButtonComponent } from "./my-button/my-button.component";
import { HttpClientModule } from "@angular/common/http";

import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireModule } from "angularfire2";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    ResolutionComponent,
    OwnersComponent,
    MyButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],

  providers: [OwnersServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
