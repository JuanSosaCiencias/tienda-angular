import { Routes } from '@angular/router';

// Traemos el componente que hicimos en los pasos anteriores
import { CategoryComponent } from './modules/product/component/category/category.component';


export const routes: Routes = [
    // Asociamos '/categoria' a el componente de Angular que creamos en la carpeta
    // cuando el usuario visite '/categoria' entonces Angular renderiza CategoryComponent
    { path: "categoria", component: CategoryComponent }
];
