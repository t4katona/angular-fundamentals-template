import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  FailedRequest,
  SuccessfulRequest,
} from "@app/auth/services/auth.service";
import { Observable, Observer, catchError, map, throwError } from "rxjs";

export interface CourseModel {
  title: string;
  description: string;
  duration: number;
  authors: string[];
  id: string;
  creationDate?: Date;
}

export interface AuthorModel {
  name: string;
  id: string;
}

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<CourseModel[]> {
    return this.http
      .get<SuccessfulRequest<CourseModel[] | string> | FailedRequest>(
        `http://localhost:4000/courses/all`
      )
      .pipe(
        map((response) => {
          if (response.successful) {
            return response.result as CourseModel[];
          } else {
            throw new Error("Failed to fetch courses");
          }
        }),
        catchError((err) => {
          console.error("Error fetching courses:", err);
          return throwError(err);
        })
      );
  }

  createCourse(
    course: Omit<CourseModel, "id" | "creationDate">
  ): Observable<CourseModel> {
    // replace 'any' with the required interface
    // Add your code here
    return this.http
      .post<{ succesful: boolean; result: CourseModel }>(
        `http://localhost:4000/courses/add`,
        course
      )
      .pipe(map((response) => response.result));
  }

  editCourse(
    id: string,
    course: Omit<CourseModel, "id" | "creationDate">
  ): Observable<CourseModel> {
    // replace 'any' with the required interface
    // Add your code here
    return this.http
      .put<{ succesful: boolean; result: CourseModel }>(
        `http://localhost:4000/courses/${id}`,
        course
      )
      .pipe(map((response) => response.result));
  }

  getCourse(id: string): Observable<CourseModel> {
    // Add your code here
    return this.http
      .get<{ succesful: boolean; result: CourseModel }>(
        `http://localhost:4000/courses/${id}`
      )
      .pipe(map((response) => response.result));
  }

  deleteCourse(id: string): Observable<void> {
    // Add your code here
    return this.http.delete<void>(`http://localhost:4000/courses/${id}`);
  }

  filterCourses(value: string): Observable<CourseModel[]> {
    // Add your code here
    let params = new HttpParams().set("value", value);
    return this.http
      .get<{ successful: boolean; result: CourseModel[] }>(
        `http://localhost:4000/courses/filter`,
        { params }
      )
      .pipe(map((response) => response.result));
  }

  getAllAuthors(): Observable<AuthorModel[]> {
    // Add your code here
    return this.http
      .get<{ succesfull: boolean; result: AuthorModel[] }>(
        `http://localhost:4000/authors/all`
      )
      .pipe(map((response) => response.result));
  }

  createAuthor(name: string) {
    // Add your code here
    return this.http.post(`http://localhost:4000/authors/add`, { name });
  }

  getAuthorById(id: string): Observable<AuthorModel> {
    // Add your code here
    return this.http
      .get<{ succesfull: boolean; result: AuthorModel }>(
        `http://localhost:4000/authors/${id}`
      )
      .pipe(map((response) => response.result));
  }
}
