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
  // variables de la clase
  categories: Category[] = []; // lista de categorias
  form: FormGroup; // formulario
  swal: SwalMessages = new SwalMessages(); // swal messages
  submitted = false; // form submitted
  loading = false; // loading request

  constructor(private categoryService: CategoryService, private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      category: ["", [Validators.required]],
      tag: ["", [Validators.required]],
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

  // función para registrar una nueva categoria
  onSubmit() {
    // validación del formulario 
    this.submitted = true;
    if(this.form.invalid){ return;}
    this.submitted = false;

    this.categoryService.createRegion(this.form.value).subscribe({
      next: (v) => {
        console.log(v);
        this.getCategories();
        this.hideModalForm();
        this.form.reset();
        this.swal.successMessage(v.message);
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error.message);
      }
    });
  }
}

