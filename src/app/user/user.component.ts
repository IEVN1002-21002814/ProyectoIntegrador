import { Component, inject } from '@angular/core';
import { LateralSignComponent } from "../lateral-sign/lateral-sign.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
/* import { Auth, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth'; */
import { Auth, AuthErrorCodes, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Route, Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [LateralSignComponent, ReactiveFormsModule, NgIf],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  authForm!: FormGroup;

  googleAuthProvider = new GoogleAuthProvider();
  auth = inject(Auth);

  errorMessage: string = '';


  constructor(private router: Router){
    this.initForm();
  }

  initForm(){
    this.authForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password : new FormControl('', Validators.required),
    })
  }

  onSubmit(){
    if (this.authForm.invalid) {
      return;
    }

    createUserWithEmailAndPassword(this.auth, this.authForm.value.email, this.authForm.value.password)
    .then((response) => {
      // Signed in
      this.redirectToDashPage();
    })
    .catch(e => {
      console.log('Error: ', e);
      if (e instanceof Error) {
        if (e.message.includes('auth/invalid-email')) {
          this.errorMessage = 'Correo Invalido.'
        }
        else if (e.message.includes('auth/invalid-credential')) {
          this.errorMessage = 'Contraseña Debil.'
        }
        else if (e.message.includes(AuthErrorCodes.EMAIL_EXISTS)) {
          this.errorMessage = 'Correo electrónico ya registrado.'
        }
        else{
          this.errorMessage = 'Error al iniciar sesión.'
        }
      }

    })
  }

  onSignInWithGoogle(){
    signInWithPopup(this.auth, this.googleAuthProvider)
    .then(response => {
      this.redirectToDashPage();
    })
    .catch(e => {
      console.log('Error: ', e);
    })
  }

  redirectToDashPage(){
    this.router.navigate(['/dash-user']);
  }
}
