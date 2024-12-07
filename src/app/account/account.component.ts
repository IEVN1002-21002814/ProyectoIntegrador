import { Component, inject } from '@angular/core';
import { LateralSignComponent } from "../lateral-sign/lateral-sign.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../servicios/login.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [LateralSignComponent, HttpClientModule, ReactiveFormsModule],
  providers:[LoginService],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  authForm!: FormGroup;

  errorMessage: string = '';
  ses:any = {};

  constructor(private apiservice:LoginService, private router: Router){
    this.initForm();
    this.sesionGet();
  }

  initForm(){
    this.authForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password : new FormControl('', Validators.required),
    })
  }

  sesionGet(){
    this.ses = this.apiservice.validarSesion();
    if (this.ses == true) {
      this.router.navigate(['/dash-user']);
    }
    
  }

  onSubmit(){
    if (this.authForm.invalid) {
      return;
    }

    this.apiservice.getLogIn(
      this.authForm.value.email,
      this.authForm.value.password
    ).subscribe({
        next: response=>{
          console.log('Respuesta: ', response)
          console.log(response.mensaje)

          if (response.exito == true) {
            this.apiservice.guardarSesion(response);
            this.redirectToDashPage();
          }
        },
        error: error=>{
          console.log('error');
        }
      }); 
  }


 redirectToDashPage(){
    this.router.navigate(['/dash-user']);
  }
}
