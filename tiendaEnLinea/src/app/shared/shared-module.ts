import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { NgxPhotoEditorModule } from "ngx-photo-editor"; 


@NgModule({
    imports: [FormsModule, ReactiveFormsModule, CommonModule, NgxPhotoEditorModule],
    exports: [FormsModule, ReactiveFormsModule, CommonModule, NgxPhotoEditorModule],
})
export class SharedModule{}


