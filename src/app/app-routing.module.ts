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
import { AdminGuard } from "./user/guards/admin.guard";

export const routes: Routes = [
  /* Add your code here */
  {
    path: "login",
    component: LoginFormComponent,
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: "registration",
    component: RegistrationFormComponent,
    canActivate: [NotAuthorizedGuard],
  },
  //default
  {
    path: "courses",

    loadChildren: () =>
      import("./features/courses/courses.module").then((m) => m.CoursesModule),
    canLoad: [AuthorizedGuard],
  },
  {
    path: "courses/add",
    component: CourseFormComponent,
    canActivate: [AuthorizedGuard, AdminGuard],
  },
  {
    path: "course/:id",
    component: CourseCardComponent,
    canActivate: [AuthorizedGuard],
  },
  {
    path: "courses/edit/:id",
    component: CourseFormComponent,
    canActivate: [AuthorizedGuard],
  },
];
