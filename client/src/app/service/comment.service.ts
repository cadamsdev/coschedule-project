import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Song } from '../model/song';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Comment } from '../model/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<Comment[]> {
    const url = `${environment.baseUrl}/comment`
    return this.http.get<Comment[]>(url)
  }

  deleteComment(comment: Comment): Observable<void> {
    const url = `${environment.baseUrl}/comment/${comment._id}`
    return this.http.delete<void>(url)
  }

  addComment(comment: Comment): Observable<void> {
    const url = `${environment.baseUrl}/comment`
    return this.http.post<void>(url, comment)
    .pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

}
