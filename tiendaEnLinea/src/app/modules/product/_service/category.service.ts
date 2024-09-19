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
      new Category(1, 'Electrónicos', 'Etiqueta1', 'Activo'), 
      new Category(2, 'Congelados', 'Etiqueta2', 'Activo'),
      new Category(3, 'Papas', 'Etiqueta3', 'Inactivo')
    ];

    return categories;
  }
}
