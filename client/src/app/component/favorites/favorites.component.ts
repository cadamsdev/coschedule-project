import { AlertType } from './../../model/alert-type';
import { Alert } from './../../model/alert';
import { MusicService } from './../../service/music.service';
import { Song } from './../../model/song';
import { Component, OnInit } from '@angular/core';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  alertType = AlertType

  title = 'client';
  search: string;
  songs: Song[];
  alert: Alert;

  constructor(private readonly service: MusicService) { }

  ngOnInit(): void {
    this.service.getFavorites()
    .subscribe((response) => {
      this.songs = response;
    })
  }

  onCloseAlert() {
    this.alert = null;
  }

  onFavorite(song: Song) {
    this.service.deleteFavorite(song)
    .pipe(
      flatMap(() => {
        this.alert = new Alert(AlertType.SUCCESS, `Successfully deleted ${song.trackName}!`)
        return this.service.getFavorites()
      })
    )
    .subscribe((songs) => {
      this.songs = songs;
    }, err => {
      this.alert = new Alert(AlertType.ERROR, 'Oops there was an error.')
    })
  }

}
