import { Component, OnInit } from '@angular/core';
import { MediaItemService } from '../media-item.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-media-item-list',
  templateUrl: './media-item-list.component.html',
  styleUrls: ['./media-item-list.component.css']
})
export class MediaItemListComponent implements OnInit {

  deleteMediaItem(mediaItem) { 
    this.mediaItemService.delete(mediaItem);
  }
  mediaItems;
  /* Moving data to mediaItem service 
  mediaItems = [
    {
      id: 1,
      name: "Firebug",
      medium: "Series",
      category: "Science Fiction",
      year: 2010,
      watchedOn: 1294166565384,
      isFavorite: false
    },
    {
      id: 2,
      name: "The Small Tall",
      medium: "Movies",
      category: "Comedy",
      year: 2015,
      watchedOn: null,
      isFavorite: true
    }, {
      id: 3,
      name: "The Redemption",
      medium: "Movies",
      category: "Action",
      year: 2016,
      watchedOn: null,
      isFavorite: false
    }, {
      id: 4,
      name: "Hoopers",
      medium: "Series",
      category: "Drama",
      year: null,
      watchedOn: null,
      isFavorite: true
    }, {
      id: 5,
      name: "Happy Joe: Cheery Road",
      medium: "Movies",
      category: "Action",
      year: 2015,
      watchedOn: 1457166565384,
      isFavorite: false
    }
  ];*/

  constructor(private mediaItemService: MediaItemService, private activatedRoute: ActivatedRoute) {
    //this.mediaItems = this.mediaItemService.get();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let medium = params['medium'];
      if(medium.toLowerCase() === 'all') {
        medium = '';
      }
      this.mediaItems = this.mediaItemService.getFiltered(medium);
    })
  }

}
