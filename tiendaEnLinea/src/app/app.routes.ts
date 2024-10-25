import { Routes } from '@angular/router';

// Traemos el componente que hicimos en los pasos anteriores
import { CategoryComponent } from './modules/product/component/category/category.component';

// Importamos los componentes de autenticación
import { LoginComponent } from './modules/auth/component/login/login.component';
import { RegisterComponent } from './modules/auth/component/register/register.component';
import { SecuredComponent } from './modules/auth/component/secured/secured.component';
import { authenticationGuard } from './modules/auth/authentication.guard';

// Importamos los componentes del consumidor
import { CustomerComponent } from './modules/customer/component/customer/customer.component';
import { CustomerImageComponent } from './modules/customer/component/customer-image/customer-image.component';
import { ProductComponent } from './modules/product/component/product/product.component';

export const routes: Routes = [
    // Asociamos '/categoria' a el componente de Angular que creamos en la carpeta
    // cuando el usuario visite '/categoria' entonces Angular renderiza CategoryComponent
    {
        path: '',
        redirectTo: '/category',
        pathMatch: 'full'
    },
    { 
        path: "category", 
        component: CategoryComponent 
    },
    {
        path: 'customer',
        component: CustomerComponent
    },
    {
        path: 'customer/:rfc',
        component: CustomerImageComponent
    },
    {
        path: 'product',
        component: ProductComponent 
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'secured',
        component: SecuredComponent, 
        canActivate: [authenticationGuard]
    }
];
