import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  datosSesion = {}
  constructor(private http:HttpClient) { }

/* LOGIN */

  guardarSesion(respuesta: any): any{
    const objetoJSON = JSON.stringify(respuesta);
    // Verificamos si el item ya existe en localStorage
    if (localStorage.getItem("userfinde")) {
        // Si existe, lo actualizamos
        localStorage.setItem("userfinde", objetoJSON);
    } else {
        // Si no existe, lo creamos
        localStorage.setItem("userfinde", objetoJSON);
    }
  }

  recuperarDatosUser():any{
    const valor = localStorage.getItem('userfinde');
    if (valor) {
      try {
        return JSON.parse(valor);
      } catch (error) {
        console.error('Error al parsear los datos del usuario:', error);
        return null;
      }
    }
    return null;
  }

  validarSesion(){
    const valor = localStorage.getItem('userfinde');
    return valor !== null;
  }

  cerrarSesion(): any{
    localStorage.removeItem('userfinde');
    return true
  }

  getLogIn(mail: string, passrd: string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = new HttpParams()
        .set('mail', mail)
        .set('pass', passrd);
    return this.http.get<any>('http://127.0.0.1:5000/loginFinde',{ headers, params });
  }
/* LOGIN */

/* DASH USER */
  updateInfoUser(id:string, fullName: string, email: string, telefono: string, 
    datebirth: string, direccion: string, estado: string, cp: string, genero: string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = {
      id: id,
      fullName: fullName,
      email: email,
      telefono: telefono,
      datebirth: datebirth,
      direccion: direccion,
      estado: estado,
      cp: cp,
      genero: genero
    };
    return this.http.put<any>('http://127.0.0.1:5000/updateInfoUser', body, { headers });
  }

  updatePassUser(id:string, passw: string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = {
      id: id,
      passw: passw,
    };
    return this.http.put<any>('http://127.0.0.1:5000/updatePassUser', body, { headers });
  }

  updateSuscriptionUser(id:string, suscripcion: string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = {
      id: id,
      sus: suscripcion,
    };
    return this.http.put<any>('http://127.0.0.1:5000/updateSuscriptionUser', body, { headers });
  }
/* DASH USER */
}
