import { Routes, provideRouter } from "@angular/router";
import {
  CourseCardComponent,
  CourseFormComponent,
  LoginFormComponent,
  RegistrationFormComponent,
} from "./shared/components";
import { CoursesComponent } from "./features/courses/courses.component";
import { ApplicationConfig } from "@angular/platform-browser";

export const routes: Routes = [
  /* Add your code here */
  { path: "login", component: LoginFormComponent },
  { path: "registration", component: RegistrationFormComponent },
  //default
  { path: "courses", component: CoursesComponent },
  { path: "**", redirectTo: "courses", pathMatch: "full" },
  { path: "courses/add", component: CourseFormComponent },
  { path: "courses/:id", component: CourseCardComponent },
  { path: "courses/edit/:id", component: CourseFormComponent },
];
