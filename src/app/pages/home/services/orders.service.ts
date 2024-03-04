import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = 'https://localhost:7115'

  constructor(
    private httpClient: HttpClient
  ) { }

  create() {
    return this.httpClient.post(`${this.baseUrl}/Order/Create`, null)
      .pipe(
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
  
}
