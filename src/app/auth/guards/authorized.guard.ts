import { Injectable } from "@angular/core";
import { CanLoad, Router, Route, UrlSegment, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthorizedGuard implements CanLoad {
  // Add your code here
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
    if (this.authService.isAuthorised) {
      return true;
    } else {
      this.router.createUrlTree(["/login"]);
      return false;
    }
  }
}
