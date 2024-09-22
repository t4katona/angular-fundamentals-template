import { Component } from "@angular/core";
import { mockedCoursesList, mockedAuthorsList } from "./shared/mocks/mocks";
mockedCoursesList;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "courses-app";
  coursesMock = mockedCoursesList;

  // Course card
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
