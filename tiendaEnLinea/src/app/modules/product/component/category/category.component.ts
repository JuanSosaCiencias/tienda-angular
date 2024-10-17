import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SharedModule, SwalMessages} from '../../../../shared/shared-module';
import { Category } from '../../_model/category';
import { CategoryService } from '../../_service/category.service'; 

declare var $: any; // Declara la variable jQuery.

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']  
})

/**
 * Componente de categorías.
 * 
 * Este componente se encarga de la logica de las categorías.
 */
export class CategoryComponent {
  // variables de la clase
  categories: Category[] = []; // lista de categorias
  form: FormGroup; // formulario
  swal: SwalMessages = new SwalMessages(); // swal messages
  submitted = false; // form submitted
  loading = false; // loading request
  category_id = 0; // id de la categoría a actualizar

  /**
   * Constructor de la clase.
   * 
   * @param {CategoryService} categoryService - Servicio de categorías.
   * @param {FormBuilder} formBuilder - Constructor de formularios.
   */
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

  /**
   * Inicializa el componente.
   * 
   * Obtiene una lista de categorías del servidor.
  */
  ngOnInit() {
    this.getCategories();
  }

  /**
   * Valida y envía el formulario.
   * 
   * Checa si queremos crear o actualizar una categoría.
   */
  onSubmit() {
    // validación del formulario 
    this.submitted = true;
    if(this.form.invalid){ return;}
    this.submitted = false;

    // valida si se está registrando o actualizando una región
    if(this.category_id == 0){
      this.onSubmitCreate();
    }else{
      this.onSubmitUpdate();
    }
  }

  /**
   * Crea una nueva categoría en el servidor.
   * 
   * Utiliza el servicio `CategoryService` para crear una nueva categoría en el servidor.
   * Se suscribe al `Observable` que emite la respuesta del servidor.
   */
  onSubmitCreate(){
    this.categoryService.createCategory(this.form.value).subscribe({
      next: (v) => {
        this.getCategories();
        this.hideModalForm();
        this.resetVariables();
        this.swal.successMessage(v.message);
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error.message);
      }
    });
  }

  /**
   * Actualiza una categoría existente en el servidor.
   * 
   * Utiliza el servicio `CategoryService` para actualizar una categoría existente en el servidor.
   * Se suscribe al `Observable` que emite la respuesta del servidor.
   */
  onSubmitUpdate(){
    this.categoryService.updateCategory(this.form.value, this.category_id).subscribe({
      next: (v) => {
        this.getCategories();
        this.hideModalForm();
        this.resetVariables();
        this.swal.successMessage(v.message);
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error.message);
      }
    });
  }

  /**
   * Modifica una categoría existente.
   * 
   * @param {Category} category - La categoría a modificar.
   */
  updateCategory(category: Category){
    this.resetVariables();
    this.showModalForm();

    this.category_id = category.category_id;
    this.form.controls['region'].setValue(category.category);
    this.form.controls['tag'].setValue(category.tag);
  }

  /**
   * Obtiene una lista de categorías del servidor.
   * 
   * Utiliza el servicio `CategoryService` para obtener una lista de categorías del servidor.
   */
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
  
  // -----   MODAL -----

  /**
   * Muestra el formulario modal para crear una nueva categoría.
   */
  showModalForm() {
    $("#modalForm").modal("show");
  } 

  /**
   * Oculta el formulario modal.
   */
  hideModalForm() {
    $("#modalForm").modal("hide");
  }

  // ------ AUX ------

  /**
   * Resetea las variables del componente.
   */
  resetVariables(){
    this.form.reset();
    this.submitted = false;
    this.category_id = 0;
  }
}

