import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalMessages } from '../../../../shared/swal-messages';
import { SharedModule } from '../../../../shared/shared-module';
import { NgxPhotoEditorService } from 'ngx-photo-editor';

// Ipmortaciones del producto
import { Product } from '../../_model/product';
import { ProductService } from '../../_service/product.service';

// Importaciones de la imagen del producto
import { ProductImage } from '../../_model/product-image';
import { ProductImageService } from '../../_service/product-image.service';

@Component({
  selector: 'app-product-image',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-image.component.html',
  styleUrl: './product-image.component.css'
})
export class ProductImageComponent {

  gtin: string = ""; // product gtin
  product: Product = new Product();

  loading = false; // loading request
  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService, // servicio product de API
    private productImageService: ProductImageService, // servicio product-image de API
    private ngxService: NgxPhotoEditorService,
    private router: Router,
  ){}

  ngOnInit(){
    this.gtin = this.route.snapshot.paramMap.get('gtin')!;
    if(this.gtin){
      this.getProduct();
    }else{
      this.swal.errorMessage("Gtin inválido"); 
    }
  }

  getProduct(){
    this.loading = true;
    this.productService.getProduct(this.gtin).subscribe({
      next: (v) => {
        this.product = v;
        this.loading = false;
        console.log(this.product);
      },
      error: (e) => {
        console.log(e);
        this.loading = false;
      }
    });
  }

  updateProductImage(image: string){
    // creamos el objeto customer image
    let productImage: ProductImage = new ProductImage();
    productImage.product_image_id = this.product.image.product_image_id;
    productImage.image = image;     
 
    // enviamos la imagen a la API
    this.productImageService.updateProductImage(productImage).subscribe({
      next: (v) => {
        this.swal.successMessage(v.message);
        this.getProduct ();
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error.message);
      }
    });
  }

   // image 
   fileChangeHandler($event: any) {
    this.ngxService.open($event, {
      aspectRatio: 1 / 1,
      autoCropArea: 1,
      resizeToWidth: 360,
      resizeToHeight: 360,
    }).subscribe(data => {
      this.updateProductImage(data.base64!);
    });
  }
  // aux 
  redirect(url: string){
    this.router.navigate([url]);
  }

}
