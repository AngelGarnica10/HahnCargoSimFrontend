import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SimService {
  private baseUrl = 'https://localhost:7115'

  constructor(
    private httpClient: HttpClient
  ) { }

  start() {
    return this.httpClient.post(`${this.baseUrl}/Sim/Start`, null)
      .pipe(
        tap(() => localStorage.setItem("start", "true")),
        catchError(this.handleError)
      )
  }

  stop() {
    return this.httpClient.post(`${this.baseUrl}/Sim/Stop`, null)
      .pipe(
        tap(() => localStorage.removeItem("start")),
        catchError(this.handleError)
      )
  }

  isStarted(): boolean {
    let started = localStorage.getItem("start");
    if(started === null)
      return false;
    return true;
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
}
