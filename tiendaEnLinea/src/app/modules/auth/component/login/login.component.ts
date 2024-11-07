import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../_service/authentication.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { LoginResponse } from '../../_model/login-response';
import { CommonModule } from '@angular/common';
import { CustomIconModule } from '../../../../shared/custom-icon-module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, CustomIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    }
  )
  public showLoading: boolean;
  private subscriptions: Subscription[] = [];
  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.showLoading = false;        
  }
  ngOnInit(): void {
    // if (this.authenticationService.isUserLoggedIn()) {
    //   this.router.navigateByUrl('/secured');
    // } else {
    //   this.router.navigateByUrl('/login');
    // }
  }
  public onLogin(): void {
    this.showLoading = true;
    var loginFormValue = this.loginForm.value as { username: string, password: string };
    this.subscriptions.push(
      this.authenticationService.login(loginFormValue).subscribe(
        (response: HttpResponse<LoginResponse>) => {
          if (response.body && response.body.token) {
            const token = response.body.token;
            this.authenticationService.saveToken(token);
            this.authenticationService.addUserToLocalCache(response.body);
            this.router.navigateByUrl('/secured');
            window.location.reload();
            this.showLoading = false; 
          }else{
            if (response.body === null) {
              console.log('La API no devolvió cuerpo en la respuesta');
              return;
            }
            console.log('El token devuelto no fue poblado')
            return;
          }          
        },
        (errorResponse: HttpErrorResponse) => {
          alert(errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  get fg() {
    return this.loginForm.controls;
  }
}