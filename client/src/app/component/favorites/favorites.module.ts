import { RouterModule } from '@angular/router';
import { FavoritesComponent } from './favorites.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class FavoritesModule { }
