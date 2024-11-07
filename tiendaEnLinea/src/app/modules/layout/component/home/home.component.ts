import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Product } from '../../../product/_model/product';
import { ProductService } from '../../../product/_service/product.service';
import { SwalMessages } from '../../../../shared/swal-messages';
import { CommonModule } from '@angular/common';
import { ProductImageService } from '../../../product/_service/product-image.service';
import { CurrencyFormatPipe } from '../../../../currency.pipe';
import { NgxPaginationModule } from 'ngx-pagination';  // Importa el módulo de paginación

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CurrencyFormatPipe, NgxPaginationModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Agregar CUSTOM_ELEMENTS_SCHEMA si es necesario
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  productImages: { [key: number]: string } = {}; // Aquí almacenamos las imágenes por product_id
  loading = false; // loading request
  swal: SwalMessages = new SwalMessages(); // swal messages
  page: number = 1; // Página actual
  itemsPerPage: number = 8; // Productos por página

  constructor(
    private productService: ProductService,
    private productImageService: ProductImageService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.productService.getActiveProducts().subscribe({
      next: (v) => {
        this.products = v;
        this.loadProductImages(); // Cargar las imágenes después de obtener los productos
        this.loading = false;
      },
      error: (e) => {
        this.loading = false;
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  loadProductImages(): void {
    this.products.forEach(product => {
      this.productImageService.getProductImages(product.product_id).subscribe({
        next: (images) => {
          if (images && images.length > 0) {
            this.productImages[product.product_id] = images[0].image; // Asignamos la primera imagen encontrada
          } else {
            this.productImages[product.product_id] = '/assets/product-default.jpg'; // Asigna una imagen por defecto
          }
        },
        error: (e) => {
          console.error(e);
          this.productImages[product.product_id] = '/assets/product-default.jpg'; // Asigna una imagen por defecto en caso de error
        }
      });
    });
  }
}
  