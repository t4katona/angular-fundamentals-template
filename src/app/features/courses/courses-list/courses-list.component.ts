import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CourseModel } from "@app/services/courses.service";
import { UserStoreService } from "@app/user/services/user-store.service";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.css"],
})
export class CoursesListComponent {
  constructor(public userStoreService: UserStoreService) {}

  @Input() courses: CourseModel[] | null = [];
  @Input() editable: boolean = true;

  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();
}
