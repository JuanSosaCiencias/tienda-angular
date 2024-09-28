import { Component } from '@angular/core';
import { CategoryService } from '../../_service/category.service';
import { CommonModule } from '@angular/common';  
import { SharedModule, SwalMessages } from '../../../../shared/shared-module';
import { FormBuilder, FormGroup } from '@angular/forms';  
import { Category } from '../../_model/category';

declare var $: any;


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']  
})
export class CategoryComponent {
  categories: any[] = [];
  swal: SwalMessages = new SwalMessages(); // swal messages
  form: FormGroup;  

  constructor(private categoryService: CategoryService, private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      categoria: [""],
      etiqueta: [""],
    });
  }

  getCategories() {
    this.categories = this.categoryService.getCategories();
  }

  ngOnInit() {
    this.getCategories();
  }

  showModalForm() {
    $("#modalForm").modal("show");
  } 

  hideModalForm() {
    $("#modalForm").modal("hide");
  }

  onSubmit(){
    let id = this.categories.length + 1;
    let region = new Category(id, this.form.controls['categoria'].value!, this.form.controls['etiqueta'].value!, 'Activo');
    this.categories.push(region);
    this.swal.successMessage("La categoria ha sido registrada"); // show message
    this.hideModalForm();
  }

}
