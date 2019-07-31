import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
      medium: new FormControl('Movies'), // Default value
      // name: new FormControl('', Validators.pattern('[\\w\\-\\s\\/]+')),
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),// Multiple validations for one field to be passed in compose array
      category: new FormControl(''),
      year: new FormControl('', this.yearValidator)
    });
  }

  yearValidator(control){
    if(control.value.trim().length === 0){
      // No error
      return null; // Since year is optional
    }
    let year = parseInt(control.value); // Convert year string to num
    let minYear = 1990;
    let maxYear = 2120;
    if(year >= minYear && year <= maxYear){
      // No error so return null
      return null;
    } else {
      // return { 'year' : true };
      // There is error then dont return null
      return { 'year' : {
        'min': minYear,
        'max': maxYear
      }};
    }
  }

}
