import { Routes, provideRouter } from "@angular/router";
import {
  CourseCardComponent,
  CourseFormComponent,
  LoginFormComponent,
  RegistrationFormComponent,
} from "./shared/components";
import { CoursesComponent } from "./features/courses/courses.component";
import { ApplicationConfig } from "@angular/platform-browser";
import { AuthorizedGuard } from "./auth/guards/authorized.guard";
import { NotAuthorizedGuard } from "./auth/guards/not-authorized.guard";

export const routes: Routes = [
  /* Add your code here */
  {
    path: "login",
    component: LoginFormComponent,
    canActivate: [NotAuthorizedGuard, AuthorizedGuard],
  },
  {
    path: "registration",
    component: RegistrationFormComponent,
    canActivate: [NotAuthorizedGuard],
  },
  //default
  {
    path: "courses",
    component: CoursesComponent,
    canActivate: [AuthorizedGuard],
  },
  { path: "**", redirectTo: "courses", pathMatch: "full" },
  {
    path: "courses/add",
    component: CourseFormComponent,
    canActivate: [AuthorizedGuard],
  },
  {
    path: "courses/:id",
    component: CourseCardComponent,
    canActivate: [AuthorizedGuard],
  },
  {
    path: "courses/edit/:id",
    component: CourseFormComponent,
    canActivate: [AuthorizedGuard],
  },
];
