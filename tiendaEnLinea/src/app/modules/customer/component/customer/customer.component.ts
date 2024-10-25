import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared-module';
import { DtoCustomerList } from '../../_dto/dto-customer-list';
import { SwalMessages } from '../../../../shared/swal-messages';
import { CustomerService } from '../../_service/customer.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  customers: DtoCustomerList[] = []; // lista de clientes
  current_date = new Date(); // hora y fecha actual
  loading = false; // loading request
  swal: SwalMessages = new SwalMessages(); // swal messages
  constructor(
    private router: Router,
    private customerService: CustomerService, // servicio customer de API
  ){}
  ngOnInit(){
    this.getCustomers();
  }
  disableCustomer(id: number){
    this.swal.confirmMessage.fire({
      title: "Favor de confirmar la eliminación",
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.disableCustomer(id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.message);
            this.getCustomers();
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message);
          }
        });
      }
    });
  }
  enableCustomer(id: number){
    this.swal.confirmMessage.fire({
      title: "Favor de confirmar la eliminación",
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.enableCustomer(id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.message);
            this.getCustomers();
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message);
          }
        });
      }
    });
  }
  getCustomers(){
    this.loading = true;
    this.customerService.getCustomers().subscribe({
      next: (v) => {
        this.customers = v;
        this.loading = false;
        this.current_date = new Date();
      },
      error: (e) => {
        console.log(e);
        this.loading = false;
      }
    });
  }
  showCustomer(rfc: string){
    this.router.navigate(['customer/' + rfc]);
  }
}