import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-messages',
  templateUrl: './snack-bar-messages.component.html',
  styleUrls: ['./snack-bar-messages.component.css']
})
export class SnackBarMessagesComponent implements OnInit {

  messages: string;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {
    this.messages = data;
   }

  ngOnInit(): void {
  }

}
