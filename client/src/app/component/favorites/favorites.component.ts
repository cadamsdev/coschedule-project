import { AlertType } from './../../model/alert-type';
import { Alert } from './../../model/alert';
import { MusicService } from './../../service/music.service';
import { Song } from './../../model/song';
import { Component, OnInit } from '@angular/core';

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
    // remove favorite
  }

}
