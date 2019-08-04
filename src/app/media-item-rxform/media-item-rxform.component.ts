import { Component, OnInit, Inject } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { MediaItemService } from '../media-item.service';
import { lookupListToken } from '../providers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-media-item-rxform',
  templateUrl: './media-item-rxform.component.html',
  styleUrls: ['./media-item-rxform.component.css']
})
export class MediaItemRxformComponent implements OnInit {
  mediaForm; // Property to hold the data from form
  constructor(private formBuilder: FormBuilder, private mediaItemService: MediaItemService, @Inject(lookupListToken) public myLookupLists, private router: Router) { }

  ngOnInit() {
    // The code here can also be put in constructor but it is preferred to use ngOnInit since this is a lifecycle event. Thus can be easily unit tested
    /*this.mediaForm = new FormGroup({
      medium: new FormControl('Movies'), // Default value
      // name: new FormControl('', Validators.pattern('[\\w\\-\\s\\/]+')),
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),// Multiple validations for one field to be passed in compose array
      category: new FormControl(''),
      year: new FormControl('', this.yearValidator)
    });*/
    this.mediaForm = this.formBuilder.group({
      medium: this.formBuilder.control('Movies'), // Default value
      // name: this.formBuilder.control('', Validators.pattern('[\\w\\-\\s\\/]+')),
      name: this.formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),// Multiple validations for one field to be passed in compose array
      category: this.formBuilder.control(''),
      year: this.formBuilder.control('', this.yearValidator)
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

  onSubmit(mediaItem) {
    console.log(mediaItem); // Will only hold values for fields with ngModel directive
    this.mediaItemService.add(mediaItem);
    this.router.navigate(['/', mediaItem.medium]); // accepts an array of params for navigation
  }

}
