import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appFavorite]'
})
export class FavoriteDirective {
  @HostBinding('class.is-favorite') isFavorite = true; // If isFavorite is true, set class is-favorite
  @HostBinding('class.is-favorite-hovering') hovering = false; 
  @HostListener('mouseenter') onMouseEnter(){// Angular works with native events thus onmouseenter is not used but mouseenter
    this.hovering = true;
  }
  @HostListener('mouseleave') onMouseLeave(){// Angular works with native events thus onmouseenter is not used but mouseenter
    this.hovering = false;
  }
  // Setter function for Input
  @Input() set appFavorite(value){
    this.isFavorite = value;
  }
  constructor() { }

}
