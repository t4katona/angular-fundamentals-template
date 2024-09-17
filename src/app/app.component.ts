import { Component } from "@angular/core";
import { mockedCoursesList } from "./shared/mocks/mocks";
mockedCoursesList;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "courses-app";
  coursesMock = mockedCoursesList;
}
