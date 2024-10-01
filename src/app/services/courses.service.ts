import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  FailedRequest,
  SuccessfulRequest,
} from "@app/auth/services/auth.service";
import { Observable, catchError, map, throwError } from "rxjs";

export interface CourseModel {
  title: string;
  description: string;
  duration: number;
  authors: string[];
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
            // Otherwise, return the course list
            return response.result as CourseModel[];
          } else {
            // Handle failed requests and throw an error
            throw new Error("Failed to fetch courses");
          }
        }),
        catchError((err) => {
          console.error("Error fetching courses:", err);
          return throwError(err);
        })
      );
  }

  createCourse(course: CourseModel) {
    // replace 'any' with the required interface
    // Add your code here
    this.http.post(`http://localhost:4000/courses/add`, course);
  }

  editCourse(id: string, course: CourseModel) {
    // replace 'any' with the required interface
    // Add your code here
    this.http.put(`http://localhost:4000/courses/${id}`, course);
  }

  getCourse(id: string) {
    // Add your code here
    this.http.get(`http://localhost:4000/courses/${id}`);
  }

  deleteCourse(id: string) {
    // Add your code here
    this.http.delete(`http://localhost:4000/courses/${id}`);
  }

  filterCourses(value: string) {
    // Add your code here
    let params = new HttpParams().set("value", value);
    return this.http.get(`http://localhost:4000/courses/filter`, { params });
  }

  getAllAuthors() {
    // Add your code here
    this.http.get(`http://localhost:4000/authors/all`);
  }

  createAuthor(name: string) {
    // Add your code here
    this.http.post(`http://localhost:4000/authors/add`, name);
  }

  getAuthorById(id: string) {
    // Add your code here
    this.http.get(`http://localhost:4000/authors/${id}`);
  }
}
