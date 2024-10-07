import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  tap,
  throwError,
} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  private name$$ = new BehaviorSubject<string>("");
  public name$ = this.name$$.asObservable();
  private isAdmin$$ = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdmin$$.asObservable();

  constructor(private userService: UserService) {}

  getUser(): Observable<void> {
    // Add your code here
    return this.userService.getUser().pipe(
      tap((response) => {
        const user = response.result;
        if (response.successful && user) {
          this.name$$.next(user.name);
          const isAdmin = user.role === "admin";
          this.isAdmin$$.next(user.role === "admin");
        }
      }),
      catchError((error) => {
        console.error("Failed to get user: ", error);
        return throwError(() => new Error("Failed to get user"));
      }),
      map(() => void 0)
    );
  }

  get isAdmin() {
    // Add your code here. Get isAdmin$$ value
    return this.isAdmin$$.getValue();
  }

  set isAdmin(value: boolean) {
    // Add your code here. Change isAdmin$$ value
    this.isAdmin$$.next(value);
  }
}
