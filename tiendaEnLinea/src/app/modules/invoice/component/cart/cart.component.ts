import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared-module';
import { DtoCartDetails } from '../../_dto/dto-cart-details';
import { CartService } from '../../_service/cart.service';
import { SwalMessages } from '../../../../shared/swal-messages';
import { CurrencyFormatPipe } from '../../../../currency.pipe';
import { Router } from '@angular/router';
import { InvoiceService } from '../../_service/invoice.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [SharedModule, CurrencyFormatPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  carts: DtoCartDetails[] = []; 
  loading = false;
  swal: SwalMessages = new SwalMessages();
  subtotal = 0;
  discount = 0;
  shipping = 0;
  
  constructor(
    private cartService: CartService,
    private router: Router,
    private invoiceService: InvoiceService
  ){}

  ngOnInit(){
    this.getCarts();
  }

  getCarts(){
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (v) => {
        this.carts = v;
        this.loading = false;
        this.subtotal = this.getSubtotal();
        this.loadCartImages();
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
      }
    });
  }

  clearCart() {
    this.loading = true;
    this.cartService.deleteCart().subscribe({
      next: () => {
        this.carts = [];
        this.loading = false;
        this.swal.successMessage("Carrito vaciado exitosamente");
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
        this.swal.errorMessage("Error al vaciar el carrito");
      }
    });
  }
  
  removeFromCart(cartId: number) {
    this.loading = true;
    this.cartService.removeFromCart(cartId).subscribe({
      next: () => {
        this.carts = this.carts.filter(cart => cart.cart_id !== cartId);
        this.loading = false;
        this.swal.successMessage("Producto eliminado del carrito");
        this.subtotal = this.getSubtotal();
        this.loadCartImages();
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
        this.swal.errorMessage("Error al eliminar el producto");
      }
    });
  }
  
  updateQuantity(cart: DtoCartDetails, increment: number) {
    const newQuantity = cart.quantity + increment;
    
    // En nuestro caso, esto nunca deberia pasar porque la unica manera de hacerlo es con un boton que 
    // lo valida antes de hacer la peticion.
    if (newQuantity <= 0) {
      this.swal.errorMessage("La cantidad debe ser al menos 1.");
      return;
    }
  
    this.loading = true;
  
    const updatedCart = {
      ...cart,
      quantity: increment // Incremento positivo o negativo.
    };
  
    this.cartService.addToCart(updatedCart).subscribe({
      next: () => {
        cart.quantity = newQuantity;
        this.loading = false;
        this.swal.successMessage(
          `Cantidad ${increment > 0 ? "aumentada" : "disminuida"} exitosamente.`
        );
        this.subtotal = this.getSubtotal();
        this.loadCartImages();
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
        this.swal.errorMessage("Error al actualizar la cantidad.");
      }
    });
  }
  
  showProduct(gtin: string){
    this.router.navigate(['userProduct/' + gtin]);
  }

  getSubtotal(){
    return this.carts.reduce((acc, cart) => acc + cart.quantity * cart.product.price, 0);
  }

  // Se deberia hacer algo asi pero no se tiene el descuento en el producto
  getDiscount(){
    // return this.carts.reduce((acc, cart) => acc + cart.quantity * cart.product.discount, 0);
  }

  checkout(){
    this.loading = true;
    this.invoiceService.generateInvoice().subscribe({
      next: (v) => {
        this.carts = [];
        this.loading = false;
        this.swal.successMessage(
          `Compra realizada exitosamente.`);
      },
      error: (e) => {
        this.loading = false;
        console.error(e);
        this.swal.errorMessage("Error al procesar la compra");
      }
    });
  }

  ngAfterViewChecked(): void {
    this.loadCartImages();
  }

  loadCartImages() {
    setTimeout(() => {
      this.carts.forEach(cart => {
        const img = new Image();
        img.src = cart.image;
  
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
  
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const data = ctx.getImageData(0, 0, 1, 1).data;
            const backgroundColor = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
  
            // Aplica el color al contenedor
            const imageContainer = document.getElementById(`image-container-${cart.cart_id}`);
            if (imageContainer) {
              imageContainer.style.backgroundColor = backgroundColor;
            } else {
              console.warn(`No se encontró el contenedor para el id: image-container-${cart.cart_id}`);
            }
          }
        };
  
        img.onerror = () => {
          console.error(`Error al cargar la imagen para el producto ${cart.product.product}`);
        };
      });
    }, 0); // Permite que Angular termine de renderizar
  }
  
  

}
