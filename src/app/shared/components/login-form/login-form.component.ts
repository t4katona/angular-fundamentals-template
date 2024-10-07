import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  constructor(private authService: AuthService, private router: Router) {}
  @ViewChild("loginForm") public loginForm!: NgForm;
  //Use the names `email` and `password` for form controls.
  email = "";
  password = "";

  onSubmit() {
    this.authService
      .login({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .subscribe({
        next: (response) => {
          if (response.successful) {
            console.log("Login successful: ", response.result);
            this.router.navigate(["/courses"]);
          } else {
            console.log("Login failed");
          }
        },
        error: (err) => {
          console.log("There was an error: ", err);
        },
      });
  }
}
