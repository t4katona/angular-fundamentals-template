import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { SessionStorageService } from "../services/session-storage.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  // Add your code here
  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionStorage: SessionStorageService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: unknown = this.sessionStorage.getToken();

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.authService.logout();
          this.router.navigate(["/login"]);
        }
        return throwError(err);
      })
    );
  }
}
