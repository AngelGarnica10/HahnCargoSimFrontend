import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/auth.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7115'
  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  login(loginData: LoginRequest) {
    return this.httpClient.post<LoginResponse>(`${this.baseUrl}/User/Login`, loginData)
    .pipe(
      tap((response: LoginResponse) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      }),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse): any {
    if (error?.error?.message) {
      return throwError(() => error?.error?.message);
    }

    if (error.error instanceof ErrorEvent) {
      return throwError(() => error.error.message);
    } else {
      return throwError(() => `Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
  }
  isLogged(): boolean {
    const now = new Date().getTime();
    const dateExpiration = new Date();
    if (now >= dateExpiration.getTime()) {
      this.removeLocalStorage();
      return false;
    } else {
      return true;
    }
  }

  removeLocalStorage(): void {
    localStorage.removeItem('user');
  }
}
