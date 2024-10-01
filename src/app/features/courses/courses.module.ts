import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CoursesComponent } from "./courses.component";
import { CoursesListComponent } from "./courses-list/courses-list.component";
import { SharedModule } from "@app/shared/shared.module";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { AuthService } from "@app/auth/services/auth.service";

@NgModule({
  declarations: [CoursesComponent, CoursesListComponent],
  imports: [CommonModule, SharedModule],
  exports: [CoursesComponent, CoursesListComponent],
})
export class CoursesModule {
  constructor(
    private coursesStore: CoursesStoreService,
    private authService: AuthService
  ) {}

  courses$ = this.coursesStore.courses$;
}
