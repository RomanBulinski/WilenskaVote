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
import { AdminComponent } from "./admin/admin.component";
import { LoginComponent } from "./login/login.component";
import { NoAccessComponent } from "./no-access/no-access.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { SignupComponent } from "./signup/signup.component";

import {
  AuthHttp,
  AUTH_PROVIDERS,
  provideAuth,
  AuthConfig
} from "angular2-jwt/angular2-jwt";
import { OrderService } from "./services/order.service";
import { AdminAuthGuard } from "./admin-auth-guard.service";
import { AuthGuard } from "./auth-guard.service";
import { MockBackend } from "@angular/http/testing";
import { fakeBackendProvider } from "./helpers/fake-backend";
import { AuthService } from "./services/auth.service";

import { FormsModule } from "@angular/forms";
import { HttpModule, Http, BaseRequestOptions } from "@angular/http";
import { RouterModule } from "@angular/router";
import { HallComponent } from "./hall/hall.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ContService } from "./contact/cont.service";

export function getAuthHttp(http) {
  return new AuthHttp(
    new AuthConfig({
      tokenName: "token"
    }),
    http
  );
}

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
    Mybutton2Component,
    AdminComponent,
    LoginComponent,
    NoAccessComponent,
    NotFoundComponent,
    SignupComponent,
    HallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    AngularFireModule,
    FirebaseRTDBService,
    OrderService,

    AuthService,
    AuthGuard,
    AdminAuthGuard,
    AuthHttp,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions,
    ContService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
