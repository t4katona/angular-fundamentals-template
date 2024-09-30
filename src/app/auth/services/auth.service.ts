import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { SessionStorageService } from "./session-storage.service";

export interface User {
  name?: string;
  email: string;
  password: string;
}

export interface SuccessfulRequest<T> {
  successful: boolean;
  result: T;
}

export interface FailedRequest {
  successful: false;
  message?: string;
  errors?: string[];
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthorized$$ = new BehaviorSubject<boolean>(false);
  public isAuthorized$: Observable<boolean> =
    this.isAuthorized$$.asObservable();

  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) {}

  login(user: User): Observable<SuccessfulRequest<string> | FailedRequest> {
    // replace 'any' with the required interface
    // Add your code here
    return this.http
      .post<SuccessfulRequest<string> | FailedRequest>(
        `http://localhost:4000/login`,
        user
      )
      .pipe(
        tap((response) => {
          if (response.successful) {
            this.sessionStorage.setToken(response.result);
            this.isAuthorised = true;
          } else {
            this.isAuthorised = false;
          }
        })
      );
  }

  logout() {
    // Add your code here
    this.sessionStorage.deleteToken();
    this.isAuthorised = false;
  }

  register(user: User): Observable<SuccessfulRequest<string> | FailedRequest> {
    // replace 'any' with the required interface
    // Add your code here
    return this.http.post<SuccessfulRequest<string> | FailedRequest>(
      `http://localhost:4000/register`,
      user
    );
  }

  get isAuthorised() {
    // Add your code here. Get isAuthorized$$ value
    return this.isAuthorized$$.getValue();
  }

  set isAuthorised(value: boolean) {
    // Add your code here. Change isAuthorized$$ value
    this.isAuthorized$$.next(value);
  }

  getLoginUrl() {
    // Add your code here
  }
}
