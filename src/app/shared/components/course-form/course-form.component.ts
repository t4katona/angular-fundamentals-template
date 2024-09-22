import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  courseForm!: FormGroup;
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
  submitted: boolean = false;
  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      duration: [null, [Validators.required, Validators.min(0)]],
      author: [
        "",
        [Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9]+$/)],
      ],
      authors: this.fb.array([]),
      courseAuthors: this.fb.array([]),
    });
  }

  get title() {
    return this.courseForm.get("title");
  }

  get description() {
    return this.courseForm.get("description");
  }

  get duration() {
    return this.courseForm.get("duration");
  }

  get author() {
    return this.courseForm.get("author");
  }

  get authors(): FormArray {
    return this.courseForm.get("authors") as FormArray;
  }

  get courseAuthors(): FormArray {
    return this.courseForm.get("courseAuthors") as FormArray;
  }

  createAuthor(): void {
    if (this.author?.valid) {
      this.authors.push(this.fb.control(this.author.value));
      this.author.reset();
    }
  }

  addAuthor(index: number): void {
    const authorControl = this.authors.at(index);
    this.courseAuthors.push(authorControl);
    this.authors.removeAt(index);
  }

  deleteAuthor(index: number): void {
    const authorControl = this.courseAuthors.at(index);
    this.authors.push(authorControl);
    this.courseAuthors.removeAt(index);
  }

  removeAuthor(index: number): void {
    this.courseAuthors.removeAt(index);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.courseForm.valid) {
      // Handle form submission logic
      console.log(this.courseForm.value);
    }
  }
}
