import { Component, OnInit } from '@angular/core';
import { MediaItemService } from '../media-item.service';

@Component({
  selector: 'app-media-item-form',
  templateUrl: './media-item-form.component.html',
  styleUrls: ['./media-item-form.component.css']
})
export class MediaItemFormComponent implements OnInit {

  constructor(private mediaItemService: MediaItemService) { }

  ngOnInit() {
  }

  onSubmit(mediaItem) {
    console.log(mediaItem); // Will only hold values for fields with ngModel directive
    this.mediaItemService.add(mediaItem);
  }

}