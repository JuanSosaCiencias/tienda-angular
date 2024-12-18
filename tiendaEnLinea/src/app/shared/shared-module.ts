import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { NgxPhotoEditorModule } from "ngx-photo-editor"; 
import { RouterModule } from "@angular/router";


@NgModule({
    imports: [
        FormsModule, 
        ReactiveFormsModule, 
        CommonModule, 
        NgxPhotoEditorModule,
        RouterModule
    ],


    exports: [
        FormsModule, 
        ReactiveFormsModule, 
        CommonModule, 
        NgxPhotoEditorModule,
        RouterModule
    ],
})

export class SharedModule{}


