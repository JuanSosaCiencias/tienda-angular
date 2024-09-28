import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import Swal from "sweetalert2";


@NgModule({
    imports: [FormsModule, ReactiveFormsModule],
    exports: [FormsModule, ReactiveFormsModule],
})
export class SharedModule{}
export class SwalMessages{
    // muestra mensaje de confirmación
    successMessage(message: string){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            toast: true,
            text: message,
            background: '#E8F8F8',
            showConfirmButton: false,
            timer: 2000
        });
    }
   
    // muestra mensaje de error
    errorMessage(message: string){
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            toast: true,
            text: message,
            background: '#F8E8F8',
            showConfirmButton: false,
            timer: 2000
        });
    }
}

