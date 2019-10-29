import { Component, OnInit } from '@angular/core';
import { MusicService } from './service/music.service';
import { Song } from './model/song';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  search: string;
  songs: Song[];

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

  onFavorite(song: Song) {

  }

}
