import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ResolutionComponent } from "./resolution/resolution.component";
import { ContactComponent } from "./contact/contact.component";
import { OwnersComponent } from "./owners/owners.component";

import { LoginComponent } from "./login/login.component";
import { NoAccessComponent } from "./no-access/no-access.component";
import { AdminComponent } from "./admin/admin.component";
import { AdminAuthGuard } from "./admin-auth-guard.service";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "owners", component: OwnersComponent },
  { path: "resolution", component: ResolutionComponent },
  { path: "contact", component: ContactComponent },

  { path: "admin", component: AdminComponent, canActivate: [AdminAuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "no-access", component: NoAccessComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
