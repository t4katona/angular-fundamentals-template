import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CourseModel } from "@app/services/courses.service";
import { mockedAuthorsList, mockedCoursesList } from "@app/shared/mocks/mocks";
import { Observable } from "rxjs";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.css"],
})
export class CoursesComponent {
  courses$: Observable<CourseModel[]>;
  editable = true;

  constructor(
    private coursesStoreService: CoursesStoreService,
    private router: Router
  ) {
    this.courses$ = this.coursesStoreService.courses$;
  }

  ngOnInit() {
    this.coursesStoreService.getAll();
  }

  onEditCourse(courseId: string) {
    this.router.navigate(["/courses/edit/", courseId]);
  }
}
