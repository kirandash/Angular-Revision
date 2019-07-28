import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-item',
  templateUrl: './media-item.component.html',
  styleUrls: ['./media-item.component.css']
})
export class MediaItemComponent implements OnInit {
  name = 'The Redemption';
  date = new Date();
  @Input() mediaItem;
  @Output() deleteMedia = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  watchedOn(){
    return `Watched on ${this.date}`;
  }

  delete(){
    this.deleteMedia.emit(this.mediaItem);
  }

}
