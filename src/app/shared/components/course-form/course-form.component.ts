import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas, faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { AuthorModel } from "@app/services/courses.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { Observable, Subject, of, switchMap, takeUntil, tap } from "rxjs";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent {
  courseId!: string | null;
  private unsubscribe$ = new Subject<void>();
  isSingleLoading$!: Observable<boolean>;
  allAuthor: AuthorModel[] = [];
  courseForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private coursesStoreService: CoursesStoreService,
    private route: ActivatedRoute,
    private coursesStateFacade: CoursesStateFacade,
    private router: Router
  ) {
    library.addIconPacks(fas);
    this.buildForm();
  }

  ngOnInit() {
    this.isSingleLoading$ = this.coursesStateFacade.isSingleCourseLoading$;

    this.courseId = this.route.snapshot.paramMap.get("id");
    console.log("id ", this.courseId);
    this.setAuthorNames()
      .pipe(
        switchMap(() => {
          if (this.courseId) {
            this.coursesStateFacade.getSingleCourse(this.courseId);
            return this.coursesStateFacade.course$;
          }
          return of(null);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((courseData) => {
        if (courseData) {
          this.courseForm.patchValue({
            title: courseData.title,
            description: courseData.description,
            duration: courseData.duration,
          });
          this.fetchAuthors(courseData.authors);
        }
      });
    this.coursesStateFacade.errorMessage$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((errorMessage) => {
        if (errorMessage) {
          alert(`An error has occurred: ${errorMessage}`);
        }
      });
  }

  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.

  submitted = false;
  //Icons
  trashIcon = faTrashCan;
  addAuthorIcon = faPlus;

  buildForm(): void {
    this.courseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      author: ["", [Validators.minLength(2), latinLettersAndNumberChecker()]],
      authors: this.fb.array([]),
      courseAuthors: this.fb.array([]),
      duration: [0, [Validators.required, Validators.min(0)]],
    });
  }

  get title() {
    return this.courseForm.get("title")!;
  }

  get description() {
    return this.courseForm.get("description")!;
  }

  get author() {
    return this.courseForm.get("author")!;
  }

  get authors() {
    return this.courseForm.get("authors") as FormArray;
  }

  get courseAuthors() {
    return this.courseForm.get("courseAuthors") as FormArray;
  }

  get duration() {
    return this.courseForm.get("duration")!;
  }

  onSubmit() {
    this.submitted = true;
    if (this.courseForm.valid) {
      let editedCourse = this.courseForm.value;
      console.log(editedCourse);

      if (this.courseId) {
        this.coursesStateFacade.editCourse(editedCourse, this.courseId);
      } else {
        this.coursesStateFacade.createCourse(editedCourse);
      }
    }
  }

  navigateBack() {
    this.router.navigate(["/courses"]);
  }

  fetchAuthors(authors: string[]) {
    this.authors.clear();
    authors.forEach((id) => {
      let author = this.allAuthor.find((a) => a.id === id);
      this.authors.push(this.fb.control(author ? author.name : ""));
    });
  }

  setAuthorNames(): Observable<AuthorModel[]> {
    return this.coursesStoreService.getAllAuthors().pipe(
      tap({
        next: (authors: AuthorModel[]) => {
          this.allAuthor = authors;
        },
        error: (err) => {
          console.log("Error while loading authors ", err);
        },
      })
    );
  }

  createAuthor() {
    if (this.author.valid) {
      let newAuthor = this.fb.control(this.author.value);
      this.authors.push(newAuthor);
      console.log("test: ", this.authors);

      this.author.reset();
    }
  }

  addAuthor(index: number) {
    let authorToMove = this.authors.at(index);
    this.courseAuthors.push(authorToMove);
    this.authors.removeAt(index);
  }

  removeAuthor(index: number) {
    let authorToRemove = this.courseAuthors.at(index);
    this.authors.push(authorToRemove);
    this.courseAuthors.removeAt(index);
  }

  deleteAuthor(index: number) {
    this.authors.removeAt(index);
  }
}
function latinLettersAndNumberChecker(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value != null && control.value.trim() != "") {
      const regex = /^[A-Za-z0-9]+$/;
      let valid = regex.test(control.value);
      return valid ? null : { invalidChars: true };
    }
    return null;
  };
}
