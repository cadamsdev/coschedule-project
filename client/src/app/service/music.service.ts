import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Song } from '../model/song';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private readonly http: HttpClient) { }

  getMusic(search: string): Observable<Song[]> {
    const url = `${environment.baseUrl}/music`
    const httpParams = new HttpParams()
    .set('search', search)

    return this.http.get<Song[]>(url, { params: httpParams })
  }

  getFavorites(): Observable<Song[]> {
    const url = `${environment.baseUrl}/music/favorites`
    return this.http.get<Song[]>(url)
  }

  deleteFavorite(song: Song): Observable<void> {
    const url = `${environment.baseUrl}/music/favorite/${song.trackId}`
    return this.http.delete<void>(url)
  }

  getDiscover(): Observable<Song[]> {
    const url = `${environment.baseUrl}/music/discover`
    return this.http.get<Song[]>(url)
  }

  saveFavorite(song: Song): Observable<void> {
    const url = `${environment.baseUrl}/music/favorite`
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
