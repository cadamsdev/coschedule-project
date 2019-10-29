import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../model/song';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

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

}
