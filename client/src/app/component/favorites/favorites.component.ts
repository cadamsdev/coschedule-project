import { CommentService } from './../../service/comment.service';
import { FavoriteService } from './../../service/favorite.service';
import { AlertType } from './../../model/alert-type';
import { Alert } from './../../model/alert';
import { Song } from './../../model/song';
import { Component, OnInit } from '@angular/core';
import { flatMap } from 'rxjs/operators';
import { Comment } from '../../model/comment';
import { combineLatest } from 'rxjs';

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

  selectedComment: Comment;
  selectedSong: Song;
  comments: Comment[];
  commentMap = new Map<number, Comment[]>();
  private _comment: String;

  constructor(
    private readonly favoriteService: FavoriteService,
    private readonly commentService: CommentService) { }

  ngOnInit(): void {
    combineLatest([this.favoriteService.getAll(), this.commentService.getAll()])
    .subscribe(([favorites, comments]) => {
      this.songs = favorites;
      this.updateCommentMap(comments);
    })
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

  onCloseAlert() {
    this.alert = null;
  }

  onFavorite(song: Song) {
    this.favoriteService.deleteOne(song)
    .pipe(
      flatMap(() => {
        this.alert = new Alert(AlertType.SUCCESS, `Successfully deleted ${song.trackName}!`)
        return this.favoriteService.getAll()
      })
    )
    .subscribe((songs) => {
      this.songs = songs;
    }, err => {
      this.alert = new Alert(AlertType.ERROR, 'Oops there was an error.')
    })
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

  onShowCommentsModal(song: Song) {
    this.selectedSong = song
    this.comments = this.commentMap.get(song.trackId)
  }

}
