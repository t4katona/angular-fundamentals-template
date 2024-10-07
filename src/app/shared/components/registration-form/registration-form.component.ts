import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;
  // Use the names `name`, `email`, `password` for the form controls.
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(4)]],
    });
  }

  get name() {
    return this.registrationForm.get("name")!;
  }
  get email() {
    return this.registrationForm.get("email")!;
  }
  get password() {
    return this.registrationForm.get("password")!;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.invalid) return;
    this.authService
      .register({
        name: this.name.value,
        email: this.email.value,
        password: this.password.value,
      })
      .subscribe({
        next: (response) => {
          if (response.successful) {
            console.log("Registration successful: ", response.result);
            this.router.navigate(["/login"]);
          } else {
            console.log("Registration failed.");
          }
        },
        error: (err) => {
          console.log("There was an error: ", err);
        },
      });
  }

  navigateToLogin() {
    this.router.navigate(["/login"]);
  }
}
