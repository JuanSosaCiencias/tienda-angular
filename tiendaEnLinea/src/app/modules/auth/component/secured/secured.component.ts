import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_service/authentication.service';

@Component({
  selector: 'app-secured',
  standalone: true,
  imports: [],
  templateUrl: './secured.component.html',
  styleUrl: './secured.component.css'
})
export class SecuredComponent {
  constructor(private router: Router, private authenticationService: AuthenticationService) {}
  public onLogOut(): void {
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
    alert(`Sesión cerrada exitosamente`);
  }
}
