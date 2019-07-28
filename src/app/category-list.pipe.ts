import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryList'
})
export class CategoryListPipe implements PipeTransform {
  // Returns all the unique categories from list
  transform(value: any, args?: any): any {
    // value is the input we get, in our case it will be mediaitem
    var categories = [];
    value.forEach(item => {
      if(categories.indexOf(item.category) <= -1) {
        // If item.category is not in the list, add it to the array
        categories.push(item.category);
      }
    })
    return categories.join(', '); // Join all the items in array with ,
  }

}
