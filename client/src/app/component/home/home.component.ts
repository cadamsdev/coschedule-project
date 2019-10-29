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

  discoverySongs: Song[];

  constructor(private readonly service: MusicService) { }

  ngOnInit(): void {
    this.service
    .getDiscover()
    .subscribe((response) => {
      this.discoverySongs = response;
    })
  }

  onSearch() {
    if (this.search) {
      this.service
      .getMusic(this.search)
      .subscribe((response) => {
        this.songs = response;
        this.search = null;
      })
    } else {
      this.songs = null;
      this.search = null;
    }
  }

  onCloseAlert() {
    this.alert = null;
  }

  onFavorite(song: Song) {
    this.service.saveFavorite(song)
    .subscribe((response) => {
      this.alert = new Alert(AlertType.SUCCESS, "Success! Your favorite was saved!");
    }, err => {
      this.alert = new Alert(AlertType.ERROR, "Oops, there was an error.");
    })
  }

}
