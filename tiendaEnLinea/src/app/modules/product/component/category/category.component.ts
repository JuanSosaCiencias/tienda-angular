import { Component } from '@angular/core';
import { CategoryService } from '../../_service/category.service'; 
import { SharedModule, SwalMessages} from '../../../../shared/shared-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { Category } from '../../_model/category';

declare var $: any;

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']  
})
  
export class CategoryComponent {
  categories: any[] = [];
  swal: SwalMessages = new SwalMessages(); // swal messages
  form: FormGroup;  
  submitted = false; // form submitted

  constructor(private categoryService: CategoryService, private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      categoria: ["", [Validators.required]],
      etiqueta: ["", [Validators.required]],
    });
  }

  getCategories() {
    this.categories = this.categoryService.getCategories();
  }

  ngOnInit() {
    this.getCategories();
  }

  showModalForm() {
    this.submitted = false;
    this.form.reset();
    $("#modalForm").modal("show");
  } 

  hideModalForm() {
    $("#modalForm").modal("hide");
  }

  

  // función para registrar una nueva categoria
  onSubmit(){
    this.submitted = true; // ya se ha enviado el formulario
    if(this.form.invalid) return; // si el formulario es inválido, se detiene la ejecución de la función
    this.submitted = false; // se reinicia el valor de submitted
    let id = this.categories.length + 1; // obtenemos el id de la nueva categoria
    let region = new Category(id, this.form.controls['categoria'].value!, this.form.controls['etiqueta'].value!, 'Activo'); // creamos un objeto de tipo Category
    this.categories.push(region); // agregamos la nueva categoria al arreglo
    this.swal.successMessage("La categoria ha sido registrada"); // usamos sweetalert para dar un mensaje bonito al usuario
    this.hideModalForm(); // cerramos el modal
    
  }

}
