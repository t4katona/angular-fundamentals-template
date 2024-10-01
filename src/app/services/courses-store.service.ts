import { Injectable } from "@angular/core";
import { CourseModel, CoursesService } from "./courses.service";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  private courses$$ = new BehaviorSubject<CourseModel[]>([]);
  public courses$: Observable<CourseModel[]> = this.courses$$.asObservable();

  private isLoading$$ = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  getAll() {
    // Add your code here
    this.isLoading$$.next(true);
    this.coursesService.getAll().subscribe({
      next: (courses: CourseModel[]) => {
        this.courses$$.next(courses);
        this.isLoading$$.next(false);
        console.log("test subs: ", this.courses$$);
      },
      error: () => this.isLoading$$.next(false),
    });
  }

  createCourse(course: any) {
    // replace 'any' with the required interface
    // Add your code here
  }

  getCourse(id: string) {
    // Add your code here
  }

  editCourse(id: string, course: any) {
    // replace 'any' with the required interface
    // Add your code here
  }

  deleteCourse(id: string) {
    // Add your code here
  }

  filterCourses(value: string) {
    // Add your code here
  }

  getAllAuthors() {
    // Add your code here
  }

  createAuthor(name: string) {
    // Add your code here
  }

  getAuthorById(id: string) {
    // Add your code here
  }
}
