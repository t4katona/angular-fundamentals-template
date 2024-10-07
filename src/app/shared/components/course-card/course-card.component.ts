import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UserStoreService } from "@app/user/services/user-store.service";
import { UserService } from "@app/user/services/user.service";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  constructor(private userStoreService: UserStoreService) {}

  @Input() title: string = "";
  @Input() description: string = "";
  @Input() creationDate: Date = new Date();
  @Input() duration: number = 0;
  @Input() authors: string[] = [];
  @Input() editable: boolean = true;

  @Output() clickOnShow = new EventEmitter<void>();
}
