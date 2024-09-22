import { Component } from "@angular/core";
import { mockedAuthorsList, mockedCoursesList } from "@app/shared/mocks/mocks";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.css"],
})
export class CoursesComponent {
  courses: any[] = [];
  editable = true;

  ngOnInit() {
    this.courses = mockedCoursesList.map((course) => ({
      ...course,
      creationDate: new Date(course.creationDate),
      authors: course.authors.map((authorID) => {
        let author = mockedAuthorsList.find((author) => author.id === authorID);
        return author ? author.name : "No author";
      }),
    }));
  }
}
