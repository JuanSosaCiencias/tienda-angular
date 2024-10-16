import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../_service/authentication.service';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../_model/user';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CustomIconModule } from '../../../../shared/custom-icon-module';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, CustomIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup(
    {
     mail: new FormControl('', [Validators.required]),
     name: new FormControl('', [Validators.required]),
     password: new FormControl('', [Validators.required]),
     rfc: new FormControl('', [Validators.required]),
     surname: new FormControl('', [Validators.required]),
     username: new FormControl('', [Validators.required])
    },    
  );
  public showLoading: boolean;
  private subscriptions: Subscription[] = [];
  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.showLoading = false;
  }
  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/secured');
    }
  }
  public onRegister(): void {
    var usuarioFormValue  = this.registerForm.value as User;
    var usuario: User = new User();
    usuario.mail = usuarioFormValue.mail;
    usuario.name = usuarioFormValue.name;
    usuario.surname = usuarioFormValue.surname;
    usuario.password = usuarioFormValue.password;
    usuario.rfc = usuarioFormValue.rfc;
    usuario.username = usuarioFormValue.username;
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.register(usuario).subscribe(
        (response: {message: string}) => {
          this.showLoading = false;
          alert(`${response.message}.`);
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
    return this.registerForm.controls;
  }
}