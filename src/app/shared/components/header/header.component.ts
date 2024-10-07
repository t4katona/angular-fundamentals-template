import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserStoreService } from "@app/user/services/user-store.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  username: string = "";
  constructor(private router: Router) {}

  login() {
    this.router.navigate(["/login"]);
  }
}
