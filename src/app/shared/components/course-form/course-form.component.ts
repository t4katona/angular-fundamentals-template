import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from "@angular/forms";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas, faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { CourseModel, CoursesService } from "@app/services/courses.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent {
  courseId: string | null = null;

  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private coursesService: CoursesService,
    private route: ActivatedRoute
  ) {
    library.addIconPacks(fas);
    this.buildForm();
  }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get("id");
    console.log("id ", this.courseId);

    //const currentCourse = this.coursesService.getCourse(this.courseId)

    /*if (this.courseId) {
      this.coursesService.editCourse(this.courseId, )
    }*/
  }

  courseForm!: FormGroup;
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
    const newCourse = {
      title: this.courseForm.value.title,
      description: this.courseForm.value.description,
      duration: this.courseForm.value.duration,
      authors: this.courseForm.value.authors,
    };
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
