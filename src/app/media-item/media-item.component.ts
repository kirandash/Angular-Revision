import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-item',
  templateUrl: './media-item.component.html',
  styleUrls: ['./media-item.component.css']
})
export class MediaItemComponent implements OnInit {
  name = 'The Redemption';
  date = new Date();
  constructor() { }

  ngOnInit() {
  }

  watchedOn(){
    return `Watched on ${this.date}`;
  }

}
