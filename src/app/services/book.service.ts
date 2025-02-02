import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { BookInputDTO } from '../DTOs/BookInputDTO';
import { BookOutputDTO } from '../DTOs/BookOutputDTO';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:50352/v1/books';

  constructor(private httpClient: HttpClient) { }

  uploadBook(input: BookInputDTO): Observable<BookOutputDTO>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.httpClient.post<BookOutputDTO>(this.apiUrl, input, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse){
    console.error('Error:', error);
    return throwError('Could not upload Book');
  }
}
