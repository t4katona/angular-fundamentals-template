import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { AuthorModel, CourseModel } from "@app/services/courses.service";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";
import { UserStoreService } from "@app/user/services/user-store.service";
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  of,
  takeUntil,
} from "rxjs";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.css"],
})
export class CoursesComponent {
  courses: CourseModel[] = [];
  filteredCourses: CourseModel[] = [];
  private unsubscribe$ = new Subject<void>();
  authors: AuthorModel[] = [];
  editable = false;
  isAdmin$: Observable<boolean>;
  isAllLoading$!: Observable<boolean>;
  lastSearchTerm: string | null = null;

  constructor(
    private coursesStoreService: CoursesStoreService,
    private userStoreService: UserStoreService,
    private router: Router,
    private coursesStateFacade: CoursesStateFacade
  ) {
    this.isAdmin$ = this.userStoreService.isAdmin$;
  }

  ngOnInit() {
    this.loadUser();
    this.isAdmin$.subscribe((isAdmin) => {
      this.editable = isAdmin;
    });

    this.coursesStateFacade.getAllCourses();
    this.getAllCourses();
    this.isAllLoading$ = this.coursesStateFacade.isAllCoursesLoading$;

    this.coursesStateFacade.errorMessage$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((errorMessage) => {
        if (errorMessage) {
          console.error("There was an error: ", errorMessage);
        }
      });
  }

  getAllCourses() {
    this.coursesStateFacade.allCourses$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (courses: CourseModel[]) => {
          this.courses = this.getAuthorsFromIds(courses);
        },
        error: (error) => {
          console.error("Failed while loading courses: ", error);
        },
      });
  }

  getAuthors() {
    this.coursesStoreService
      .getAllAuthors()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (authors: AuthorModel[]) => {
          this.authors = authors;
          this.courses = this.getAuthorsFromIds(this.courses);
          this.filteredCourses = this.getAuthorsFromIds(this.filteredCourses);
        },
        error: (error) => {
          alert("Failed while loading authors.");
          console.error("Failed while loading authors: ", error);
        },
      });
  }

  getFilteredCourses(searchTerm: string) {
    this.coursesStateFacade.getFilteredCourses(searchTerm);

    this.coursesStateFacade.courses$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (courses: CourseModel[]) => {
          this.filteredCourses = this.getAuthorsFromIds(courses);
        },
        error: (error) => {
          alert("Something went wrong");
          console.error("Something went wrong", error);
        },
      });
  }

  onSearch(searchTerm: string) {
    if (this.lastSearchTerm !== searchTerm) {
      of(searchTerm)
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          takeUntil(this.unsubscribe$)
        )
        .subscribe((debouncedSearchTerm) => {
          this.getFilteredCourses(debouncedSearchTerm);
          this.lastSearchTerm = debouncedSearchTerm;
        });
    }
  }

  getAuthorsFromIds(courses: CourseModel[]): CourseModel[] {
    return courses.map((course) => ({
      ...course,
      authors: course.authors.map((authorId) => {
        let author = this.authors.find((a) => a.id === authorId);
        return author ? author.name : "";
      }),
    }));
  }

  onDeleteCourse(courseId: string) {
    this.coursesStateFacade.deleteCourse(courseId);
  }

  onEditCourse(courseId: string) {
    this.router.navigate([`/courses/edit/${courseId}`]);
  }

  onShowCourse(courseId: string) {
    console.log(courseId);
    this.router.navigate([`/courses/${courseId}`]);
  }

  loadUser(): void {
    this.userStoreService.getUser().subscribe({
      next: () => {
        console.log("User loaded successfully.");
      },
      error: (err) => {
        console.error("Error loading user: ", err);
      },
    });
  }
}
