import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../model/song';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private readonly http: HttpClient) { }

  getSongsBySearch(search: string): Observable<Song[]> {
    const url = `${environment.baseUrl}/song`
    const httpParams = new HttpParams()
    .set('search', search)
    return this.http.get<Song[]>(url, { params: httpParams })
  }

  getDiscover(): Observable<Song[]> {
    const url = `${environment.baseUrl}/song/discover`
    return this.http.get<Song[]>(url)
  }

}
