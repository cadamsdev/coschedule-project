import { flatMap } from 'rxjs/operators';
import { CommentService } from './../../service/comment.service';
import { MusicService } from './../../service/music.service';
import { AlertType } from './../../model/alert-type';
import { Song } from './../../model/song';
import { Alert } from './../../model/alert';
import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Comment } from '../../model/comment';

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
  comment: String;
  selectedSong: Song;
  comments: Comment[];
  discoverySongs: Song[];

  commentMap = new Map<number, Comment[]>();

  constructor(
    private readonly service: MusicService,
    private readonly commentService: CommentService
    ) { }

  ngOnInit(): void {
    combineLatest([this.service.getDiscover(), this.commentService.getAll()])
    .subscribe(([discover, comments]) => {
      this.discoverySongs = discover
      this.updateCommentMap(comments);
      console.log(comments)
    });
  }

  updateCommentMap(comments: Comment[]) {
    if (comments) {
      this.commentMap.clear()
      for (const comment of comments) {
        const value = this.commentMap.get(comment.trackId)
        if (!value) {
          this.commentMap.set(comment.trackId, [comment])
        } else {
          value.push(comment)
        }
      }
    }
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

  addComment() {
    if (this.comment && this.selectedSong) {
      this.commentService
      .addComment({
        _id: '-1',
        msg: this.comment,
        trackId: this.selectedSong.trackId,
        dateAdded: new Date()
      })
      .pipe(
        flatMap(() => {
          return this.commentService.getAll()
        })
      )
      .subscribe((comments) => {
        this.comment = null
        this.updateCommentMap(comments);
        this.comments = this.commentMap.get(this.selectedSong.trackId)
      })
    }
  }

  getCommentCountForTrack(song: Song): number {
    let count = 0

    if (song) {
      const comments = this.commentMap.get(song.trackId)
      if (comments) {
        count = comments.length;
      }
    }

    return count
  }

  onCloseAlert() {
    this.alert = null;
  }

  onShowCommentsModal(song: Song) {
    this.selectedSong = song
    this.comments = this.commentMap.get(song.trackId)
    console.log(`show comments for song=${song.trackName}`)
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
