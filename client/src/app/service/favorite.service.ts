import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Song } from '../model/song';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<Song[]> {
    const url = `${environment.baseUrl}/favorite`
    return this.http.get<Song[]>(url)
  }

  deleteOne(song: Song): Observable<void> {
    const url = `${environment.baseUrl}/favorite/${song.trackId}`
    return this.http.delete<void>(url)
  }

  save(song: Song): Observable<void> {
    const url = `${environment.baseUrl}/favorite`
    return this.http.post<void>(url, song)
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
