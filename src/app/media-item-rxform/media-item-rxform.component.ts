import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-media-item-rxform',
  templateUrl: './media-item-rxform.component.html',
  styleUrls: ['./media-item-rxform.component.css']
})
export class MediaItemRxformComponent implements OnInit {
  mediaForm; // Property to hold the data from form
  constructor() { }

  ngOnInit() {
    // The code here can also be put in constructor but it is preferred to use ngOnInit since this is a lifecycle event. Thus can be easily unit tested
    this.mediaForm = new FormGroup({
      medium: new FormControl('Movies'),
      name: new FormControl(''),
      category: new FormControl(''),
      year: new FormControl('')
    });
  }

}
