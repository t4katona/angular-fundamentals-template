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
      return true; // User is authorized, allow loading the route
    } else {
      console.log("false");
      this.router.navigate(["/login"]); // Redirect to login if not authorized
      return false;
    }
  }
}
