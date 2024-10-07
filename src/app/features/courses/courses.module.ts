import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CoursesComponent } from "./courses.component";
import { CoursesListComponent } from "./courses-list/courses-list.component";
import { SharedModule } from "@app/shared/shared.module";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { RouterModule, Routes } from "@angular/router";
import { CourseInfoComponent } from "../course-info/course-info.component";

const routes: Routes = [
  {
    path: "",
    component: CoursesComponent,
    children: [
      {
        path: "",
        component: CoursesListComponent,
      },
      {
        path: ":id",
        component: CourseInfoComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [CoursesComponent, CoursesListComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [CoursesComponent, CoursesListComponent],
})
export class CoursesModule {
  constructor(private coursesStore: CoursesStoreService) {}

  courses$ = this.coursesStore.courses$;
}
