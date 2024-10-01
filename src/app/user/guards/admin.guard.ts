import { Injectable } from "@angular/core";
import { UserStoreService } from "../services/user-store.service";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { CanActivate } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  // Add your code here
  constructor(
    private userStoreService: UserStoreService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.userStoreService.isAdmin) {
      return true;
    } else {
      console.log("user is not an Admin");
      return this.router.createUrlTree(["/courses"]);
    }
  }
}
