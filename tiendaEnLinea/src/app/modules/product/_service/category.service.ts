import { Injectable } from '@angular/core';
import { Category } from '../_model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategories(){
    // const is better than 'var' because of reach and it doesn't get reassigned
    const categories=   [
      new Category(1, 'Electronics', 'Tag1', 'Active'), 
      new Category(2, 'Frozen', 'Tag2', 'Inactive'),
      new Category(3, 'Chips', 'Tag3', 'Active')
    ];

    return categories;
  }
}
