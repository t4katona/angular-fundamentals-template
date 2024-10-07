import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SessionStorageService } from "@app/auth/services/session-storage.service";
import { Observable, catchError, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {}

  getUser(): Observable<{
    successful: boolean;
    result: { name: string; email: string; password: string; role: string };
  }> {
    let token = this.sessionStorageService.getToken();
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<{
        successful: boolean;
        result: { name: string; email: string; password: string; role: string };
      }>("http://localhost:4000/users/me", { headers })
      .pipe(
        catchError((error) => {
          console.error("An error occurred.", error);
          return throwError(() => new Error(error));
        })
      );
  }
}
