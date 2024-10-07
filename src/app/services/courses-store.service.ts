import { Injectable } from "@angular/core";
import { AuthorModel, CourseModel, CoursesService } from "./courses.service";
import {
  BehaviorSubject,
  Observable,
  catchError,
  of,
  switchMap,
  tap,
  throwError,
} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  private courses$$ = new BehaviorSubject<CourseModel[]>([]);
  public courses$: Observable<CourseModel[]> = this.courses$$.asObservable();
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();
  private authors$$ = new BehaviorSubject<AuthorModel[]>([]);
  public authors$ = this.authors$$.asObservable();
  private currentAuthor$$ = new BehaviorSubject<AuthorModel | null>(null);
  public currentAuthor$ = this.currentAuthor$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  getAll() {
    this.isLoading$$.next(true);
    return this.coursesService.getAll().pipe(
      tap((courses) => {
        this.courses$$.next(courses);
        this.isLoading$$.next(false);
      }),
      catchError((error) => {
        this.isLoading$$.next(false);
        console.error(`An error occurred: ${error}`);
        return of([]);
      })
    );
  }

  createCourse(course: CourseModel) {
    // replace 'any' with the required interface
    // Add your code here
    this.isLoading$$.next(true);
    return this.coursesService.createCourse(course).pipe(
      tap((createdCourse) => {
        this.courses$$.next([...this.courses$$.value, createdCourse]);
        this.isLoading$$.next(false);
      }),
      catchError((error) => {
        this.isLoading$$.next(false);
        return throwError(() => new Error(`An error occurred: ${error}`));
      })
    );
  }

  getCourse(id: string) {
    // Add your code here
    this.isLoading$$.next(true);
    this.coursesService.getCourse(id).subscribe({
      next: (course: CourseModel) => {
        const currentCourses = this.courses$$.getValue();
        this.courses$$.next([...currentCourses, course]);
        this.isLoading$$.next(false);
      },
      error: () => this.isLoading$$.next(false),
    });
  }

  editCourse(id: string, course: CourseModel) {
    // replace 'any' with the required interface
    // Add your code here
    this.isLoading$$.next(true);
    this.coursesService.editCourse(id, course).subscribe({
      next: (updatedCourse: CourseModel) => {
        const currentCourses = this.courses$$.getValue();
        const updatedCourses = currentCourses.map((current) =>
          current.id === id ? updatedCourse : current
        );
        this.courses$$.next(updatedCourses);
        this.isLoading$$.next(false);
      },
      error: () => this.isLoading$$.next(false),
    });
  }

  deleteCourse(id: string) {
    this.isLoading$$.next(true);
    this.coursesService.deleteCourse(id).pipe(
      switchMap(() => {
        return this.getAll();
      }),
      catchError((error) => {
        console.error(`An error occurred: ${error}`);
        return of(null);
      }),
      tap(() => {
        this.isLoading$$.next(false);
      })
    );
  }

  filterCourses(value: string): Observable<CourseModel[]> {
    // Add your code here
    this.isLoading$$.next(true);
    return this.coursesService.filterCourses(value).pipe(
      tap((filteredCourses) => {
        this.courses$$.next(filteredCourses);
        this.isLoading$$.next(false);
      }),
      catchError((error) => {
        this.isLoading$$.next(false);
        return throwError(() => new Error(`An error occurred: ${error}`));
      })
    );
  }

  getAllAuthors() {
    this.isLoading$$.next(true);
    return this.coursesService.getAllAuthors().pipe(
      tap((authors) => {
        this.authors$$.next(authors);
        this.isLoading$$.next(false);
      }),
      catchError((error) => {
        return throwError(() => new Error(`An error occurred: ${error}`));
      })
    );
  }

  createAuthor(name: string) {
    // Add your code here
    this.isLoading$$.next(true);
    return this.coursesService.createAuthor(name).pipe(
      tap(() => {
        this.getAllAuthors();
        this.isLoading$$.next(false);
      }),
      catchError((error) => {
        this.isLoading$$.next(false);
        return throwError(() => new Error(`An error occurred: ${error}`));
      })
    );
  }

  getAuthorById(id: string) {
    // Add your code here
    this.isLoading$$.next(true);
    return this.coursesService.getAuthorById(id).pipe(
      tap((author) => {
        this.currentAuthor$$.next(author);
        this.isLoading$$.next(false);
      }),
      catchError((error) => {
        this.isLoading$$.next(false);
        return throwError(() => new Error(`An error occurred: ${error}`));
      })
    );
  }
}
