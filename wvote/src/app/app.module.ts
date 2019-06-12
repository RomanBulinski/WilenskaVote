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

import { FirebaseRTDBService } from "./service/firebase-rtdb.service";

// import { MyButtonComponent } from "./my-button/my-button.component";
import { HttpClientModule } from "@angular/common/http";

import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";

import { ReactiveFormsModule } from "@angular/forms";
import { BoxOfbuttonComponent } from "./box-ofbutton/box-ofbutton.component";
import { Mybutton2Component } from "./mybutton2/mybutton2.component";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    ResolutionComponent,
    OwnersComponent,
    // MyButtonComponent,
    BoxOfbuttonComponent,
    Mybutton2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  providers: [AngularFireModule, FirebaseRTDBService],
  bootstrap: [AppComponent]
})
export class AppModule {}
