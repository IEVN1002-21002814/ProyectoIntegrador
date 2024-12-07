import { Component, inject } from '@angular/core';
import { NavComponent } from '../../nav/nav.component';
import { FooterComponent } from '../../footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../../servicios/login.service';
/* import { BrowserModule } from '@angular/platform-browser'; */
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-info-user',
  standalone: true,
  imports: [NavComponent, FooterComponent, HttpClientModule, ReactiveFormsModule, CommonModule],
  providers:[LoginService],
  templateUrl: './info-user.component.html',
  styleUrl: './info-user.component.css'
})
export class InfoUserComponent {
  updateForm!: FormGroup;
  updatePass!: FormGroup;
  updateSusc!: FormGroup;

  ses:any = {};
  usuario:any = {};

  btninfo:boolean = true;
  btnsecure:boolean = false;
  btnsuscri:boolean = false;

  constructor(private apiservice:LoginService, private router: Router){
    this.initForm();
    this.sesionGet();
    
  }

  sesionGet(){
    this.ses = this.apiservice.validarSesion();
    if (this.ses == false) {
      this.router.navigate(['/account']);
    }
    else{
      this.router.navigate(['/dash-user']);
    }
  }

  initForm(){
    this.updateForm = new FormGroup({
      id: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      suscripción : new FormControl('', Validators.required),
      datebirth : new FormControl('', Validators.required),
      direccion : new FormControl('', Validators.required),
      estado : new FormControl('', Validators.required),
      cp : new FormControl('', Validators.required),
      genero : new FormControl('', Validators.required),
    })
    this.updatePass = new FormGroup({
      id: new FormControl('', Validators.required),
      oldpass: new FormControl('', Validators.required),
      newpass : new FormControl('', Validators.required),
    })
    this.updateSusc = new FormGroup({
      id: new FormControl('', Validators.required),
      suscripcion: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.usuario = this.apiservice.recuperarDatosUser();
    this.datosInput();
    console.log(this.usuario);

  }

  datosInput(){
    this.updateForm.patchValue({
      fullName: this.usuario.usuario.nombre,
      email: this.usuario.usuario.correo,
      telefono: this.usuario.usuario.telefono,
      datebirth: this.usuario.usuario.fecha_nacimiento,
      direccion: this.usuario.usuario.direccion,
      estado: this.usuario.usuario.estado,
      cp: this.usuario.usuario.cp,
      genero: this.usuario.usuario.genero,
      id: this.usuario.usuario.id,
    });
    this.updatePass.patchValue({
      id: this.usuario.usuario.id,
      oldpass: this.usuario.usuario.contra,
    });
    this.updateSusc.patchValue({
      id: this.usuario.usuario.id,
      suscripcion: this.usuario.usuario.suscripcion,
    });
  }

  onSubmit(){
    this.apiservice.updateInfoUser(
      this.updateForm.value.id,
      this.updateForm.value.fullName,
      this.updateForm.value.email,
      this.updateForm.value.telefono,
      this.updateForm.value.datebirth,
      this.updateForm.value.direccion,
      this.updateForm.value.estado,
      this.updateForm.value.cp,
      this.updateForm.value.genero
    ).subscribe({
        next: response=>{
          if (response.exito == true) {
            this.recargarDatos();
          }
        },
        error: error=>{
          console.log('error');
          console.log(error);
        }
      }); 
  }

  passSubmit(){
    this.apiservice.updatePassUser(
      this.updatePass.value.id,
      this.updatePass.value.newpass,
    ).subscribe({
      next: response=>{
        console.log('Respuesta PASSWORD: ', response)
        if (response.exito == true) {
          this.usuario.usuario.contra = this.updatePass.value.newpass;
          this.recargarDatos();
        }
      },
      error: error=>{
        console.log('error');
        console.log(error);
      }
    });  
  }

  suscriSubmit(){
    this.apiservice.updateSuscriptionUser(
      this.updateSusc.value.id,
      this.updateSusc.value.suscripcion,
    ).subscribe({
      next: response=>{
        console.log('Respuesta Suscripción: ', response)
        if (response.exito == true) {
          this.recargarDatos();
        }
      },
      error: error=>{
        console.log('error');
        console.log(error);
      }
    });  
  }

  btnInformacion(){
    this.btninfo = true;
    this.btnsecure = false;
    this.btnsuscri = false;
  }
  btnSeguridad(){
    this.btninfo = false;
    this.btnsecure = true;
    this.btnsuscri = false;
  }
  btnSuscripcion(){
    this.btninfo = false;
    this.btnsecure = false;
    this.btnsuscri = true;
  }

  recargarDatos(){
    this.apiservice.getLogIn(
      this.updateForm.value.email,
      this.usuario.usuario.contra
    ).subscribe({
        next: response=>{
          console.log('Respuesta RECARGA: ', response)
          console.log(response.mensaje)

          if (response.exito == true) {
            this.apiservice.guardarSesion(response);
            this.usuario = this.apiservice.recuperarDatosUser();
            this.datosInput();
          }
        },
        error: error=>{
          console.log('error');
        }
      }); 
  }





  
  cerrarSesion(){
    this.apiservice.cerrarSesion() ;
    this.router.navigate(['/home']);
  }

  
}
