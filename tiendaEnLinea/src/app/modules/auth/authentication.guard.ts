import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './_service/authentication.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = (route, state) => {
  
  let estaLlogeado = inject(AuthenticationService).isUserLoggedIn();
  console.log(estaLlogeado);
  if(!estaLlogeado){
    console.log('No esta loggeado');
    return inject(Router).navigate(['/login']);
  }
  
  return true;
};