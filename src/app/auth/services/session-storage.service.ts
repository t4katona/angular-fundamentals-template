import { Injectable, Inject, InjectionToken } from "@angular/core";

const TOKEN = "SESSION_TOKEN";

export const WINDOW = new InjectionToken<Window>("WindowToken", {
  providedIn: "root",
  factory: () => window,
});

@Injectable({
  providedIn: "root",
})
export class SessionStorageService {
  constructor(@Inject(WINDOW) private window: Window) {}

  setToken(token: string): void {
    this.window.sessionStorage.setItem(TOKEN, token);
  }

  getToken(): string | null {
    return this.window.sessionStorage.getItem(TOKEN);
  }

  deleteToken(): void {
    this.window.sessionStorage.removeItem(TOKEN);
  }
}
