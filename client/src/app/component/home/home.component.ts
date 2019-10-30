import { FavoriteService } from './../../service/favorite.service';
import { SongService } from './../../service/song.service';
import { flatMap } from 'rxjs/operators';
import { CommentService } from './../../service/comment.service';
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
  selectedComment: Comment;
  selectedSong: Song;
  comments: Comment[];
  discoverySongs: Song[];

  commentMap = new Map<number, Comment[]>();

  private _comment: String;

  constructor(
    private readonly songService: SongService,
    private readonly commentService: CommentService,
    private readonly favoriteService: FavoriteService
    ) { }

  ngOnInit(): void {
    combineLatest([this.songService.getDiscover(), this.commentService.getAll()])
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
      this.songService
      .getSongsBySearch(this.search)
      .subscribe((response) => {
        this.songs = response;
        this.search = null;
      })
    } else {
      this.songs = null;
      this.search = null;
    }
  }

  addComment(): void {
    if (this.comment && this.selectedSong && !this.selectedComment) {
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
        this.selectedComment = null;
        this.updateCommentMap(comments);
        this.comments = this.commentMap.get(this.selectedSong.trackId)
      })
    }
  }

  updateComment() {
    if (this.comment && this.selectedSong && this.selectedComment) {
      this.commentService
      .updateComment(this.selectedComment)
      .pipe(
        flatMap(() => {
          return this.commentService.getAll()
        })
      )
      .subscribe((comments) => {
        this.comment = null
        this.selectedComment = null;
        this.updateCommentMap(comments);
        this.comments = this.commentMap.get(this.selectedSong.trackId)
      })
    }
  }

  onSelectComment(comment: Comment) {
    this.selectedComment = comment
    this.comment = comment.msg
  }

  get comment(): String {
    let comment = this._comment
    if (this.selectedComment) {
      comment = this.selectedComment.msg
    }
    return comment
  }

  set comment(value: String) {
    if (this.selectedComment) {
      this.selectedComment.msg = value
      this._comment = value
    } else {
      this._comment = value
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
    this.favoriteService.save(song)
    .subscribe(() => {
      this.alert = new Alert(AlertType.SUCCESS, "Success! Your favorite was saved!");
    }, err => {
      this.alert = new Alert(AlertType.ERROR, "Oops, there was an error.");
    })
  }

}
