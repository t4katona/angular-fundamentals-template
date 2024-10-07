import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { AuthorModel, CourseModel } from "@app/services/courses.service";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";
import { Observable, Subject, takeUntil, tap } from "rxjs";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent implements OnInit, OnDestroy {
  course: CourseModel = {
    title: "",
    description: "",
    duration: 0,
    authors: [],
    id: "",
    creationDate: new Date(),
  };

  authors: AuthorModel[] = [];
  private unsubscribe$ = new Subject<void>();
  isSingleLoading$!: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesStoreService: CoursesStoreService,
    private coursesStateFacade: CoursesStateFacade
  ) {}

  ngOnInit() {
    this.isSingleLoading$ = this.coursesStateFacade.isSingleCourseLoading$;
    let courseId = this.route.snapshot.paramMap.get("id");
    this.getAllAuthors().subscribe(() => {
      if (courseId) {
        this.coursesStateFacade.getSingleCourse(courseId);
        this.coursesStateFacade.course$
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((course: CourseModel) => {
            console.log("Received course data: ", course);
            this.course = { ...course };
            this.getAuthorsFromIds();
          });
      }
    });
  }

  goBack() {
    this.router.navigate(["./courses"]);
  }

  getAuthorsFromIds() {
    if (this.course && this.authors.length) {
      const authorNames = this.course.authors.map((authorId) => {
        const author = this.authors.find((el) => el.id === authorId);
        return author ? author.name : "";
      });
      this.course = {
        ...this.course,
        authors: authorNames,
      };
    }
  }

  getAllAuthors(): Observable<AuthorModel[]> {
    return this.coursesStoreService.getAllAuthors().pipe(
      tap({
        next: (authors: AuthorModel[]) => {
          this.authors = authors;
        },
        error: (err) => {
          alert("Failed to load authors.");
          console.error("Failed to load authors.", err);
        },
      })
    );
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
