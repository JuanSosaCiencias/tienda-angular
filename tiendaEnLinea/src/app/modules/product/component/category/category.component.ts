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
  form: FormGroup; // formulario
  swal: SwalMessages = new SwalMessages(); // swal messages
  submitted = false; // form submitted
  loading = false; // loading request

  constructor(private categoryService: CategoryService, private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      categoria: ["", [Validators.required]],
      etiqueta: ["", [Validators.required]],
    });

    // Esta parte es para resetear los errores al escribir en los campos
    this.form.get('categoria')?.valueChanges.subscribe(() => {
      this.submitted = false; // Resetea `submitted` al escribir
    });
    
    this.form.get('etiqueta')?.valueChanges.subscribe(() => {
      this.submitted = false; // Resetea `submitted` al escribir
    });
  }

  getCategories() {
    this.loading = true;
    this.categoryService.getCategories().subscribe({
      next: (v) => {
        this.categories = v;
        // console.log(v);
        this.loading = false;
      },
      error: (e) => {
        console.log(e);
        this.loading = false;
      }
    })
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

  private addCategory(){
    let id = this.categories.length + 1; // obtenemos el id de la nueva categoria
    let region = new Category(id, this.form.controls['categoria'].value!, this.form.controls['etiqueta'].value!, 'Activo'); // creamos un objeto de tipo Category
    this.categories.push(region); // agregamos la nueva categoria al arreglo
    this.swal.successMessage("La categoria ha sido registrada"); // usamos sweetalert para dar un mensaje bonito al usuario
    this.hideModalForm(); // cerramos el modal
  }

  // función para registrar una nueva categoria
  onSubmit() {
    this.submitted = true; // ya se ha enviado el formulario
    if (this.form.invalid) return; // si el formulario es inválido, se detiene la ejecución de la función
    this.submitted = false;
    this.addCategory(); // se llama a la función para agregar una nueva categoria
  }
}

