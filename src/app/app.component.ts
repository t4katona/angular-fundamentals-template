import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth/services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "courses-app";
  isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    this.router.navigate(["/login"]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  ngOnInit() {
    this.authService.isAuthorized$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }
}
