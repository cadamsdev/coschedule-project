import { MusicService } from './../../service/music.service';
import { AlertType } from './../../model/alert-type';
import { Song } from './../../model/song';
import { Alert } from './../../model/alert';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  alertType = AlertType

  title = 'client';
  search: string;
  songs: Song[];
  alert: Alert;

  constructor(private readonly service: MusicService) { }

  ngOnInit(): void {

  }

  onSearch() {
    if (this.search) {
      this.service
      .getMusic(this.search)
      .subscribe((response) => {
        this.songs = response;
      })
    } else {
      this.songs = [];
    }
  }

  onCloseAlert() {
    this.alert = null;
  }

  onFavorite(song: Song) {
    this.service.saveFavorite(song)
    .subscribe((response) => {
      console.log('saved favorite')
      this.alert = new Alert(AlertType.SUCCESS, "Success! Your favorite was saved!");
    }, err => {
      this.alert = new Alert(AlertType.ERROR, "Oops, there was an error.");
    })
  }

}
