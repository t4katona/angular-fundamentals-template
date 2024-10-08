import { Injectable } from "@angular/core";
import { CanLoad, Router, Route, UrlSegment, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthorizedGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {
    console.log(
      "isAuthorized on component init: ",
      this.authService.isAuthorised
    );
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    console.log("isAuthorized value: ", this.authService.isAuthorised);
    if (this.authService.isAuthorised) {
      console.log("true");
      return true;
    } else {
      console.log("false");
      this.router.createUrlTree(["/login"]);
      return false;
    }
  }
}
