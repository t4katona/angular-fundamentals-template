import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { SessionStorageService } from "./session-storage.service";

export interface User {
  name?: string;
  email: string;
  password: string;
  role?: string;
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

export interface LoginModule {
  successful: boolean;
  result: string;
  user: {
    email: string;
    name: string | null;
  };
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

  login(user: User): Observable<LoginModule> {
    // replace 'any' with the required interface
    // Add your code here
    return this.http
      .post<LoginModule>(`http://localhost:4000/login`, user)
      .pipe(
        tap((response: LoginModule) => {
          if (response.successful) {
            this.sessionStorage.setToken(response.result);
            this.isAuthorized$$.next(true);
          } else {
            this.isAuthorised = false;
          }
        })
      );
  }

  logout() {
    // Add your code here
    this.sessionStorage.deleteToken();
    this.isAuthorized$$.next(false);
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
    console.log("isAuthorized called", this.isAuthorized$$.getValue());
    return this.isAuthorized$$.getValue();
  }

  set isAuthorised(value: boolean) {
    // Add your code here. Change isAuthorized$$ value
    this.isAuthorized$$.next(value);
  }

  getLoginUrl() {
    // Add your code here
    return "http://localhost:4000/login";
  }
}
