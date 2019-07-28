import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appFavorite]'
})
export class FavoriteDirective {
  @HostBinding('class.is-favorite') isFavorite = true; // If isFavorite is true, set class is-favorite
  
  // Setter function for Input
  @Input() set appFavorite(value){
    this.isFavorite = value;
  }
  constructor() { }

}
