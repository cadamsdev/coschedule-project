import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class HomeModule { }
