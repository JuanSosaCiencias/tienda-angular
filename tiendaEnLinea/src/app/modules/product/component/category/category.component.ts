import { Component } from '@angular/core';
import { CategoryService } from '../../_service/category.service';
import { CommonModule } from '@angular/common';  // Importa CommonModule para usar *ngFor

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  // Variable que almacena las categorías
  categories: any[] = [];

  // Nos da un constructor que debe tener una instancia del servicio (inyección)
  constructor(private categoryService: CategoryService) { }

  // Metodo que manda a llamar la funcion que hicimos antes del servicio  
  getCategories() {
    this.categories = this.categoryService.getCategories();
  }

  // Método ngOnInit que se ejecuta cuando el componente se inicializa
  ngOnInit() {
    this.getCategories();  // Llama al método getCategories para cargar las categorías al iniciar
  }
}
