import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import {UserInterface} from '../models/Users-interface';
import { StrapiService } from './strapi.service';
import { AuthGuard } from '../guards/auth.guard';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    getUser(NombreUsuario: string, Contrasenia: string) {
      throw new Error('Method not implemented.');
    }
    // tslint:disable-next-line: member-ordering
    endPoint: string;
    constructor(private httpClient: HttpClient, private strapiservice: StrapiService) {
      this.endPoint =  'http://3.15.17.50:1337/users/';
    }
  
    headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json"
    });
  
    registerUser(Nombre:string, Apellido:string, NombreUsuario: string, CorreoElectronico: string, Contrasenia: string){
      const url_api = 'http://3.15.17.50:1337/users/';
      return this.httpClient.post<UserInterface>(
      url_api, 
      {Nombre:Nombre, 
      Apellido:Apellido,
      NombreUsuario:NombreUsuario, 
      CorreoElectronico:CorreoElectronico, 
      Contrasenia:Contrasenia},
      {headers: this.headers}
      )
      .pipe(map(data => data));
    }
  
    loginUser(NombreUsuario: string, Contrasenia: string): Observable<any>{
      const url_api = 'http://3.15.17.50:1337/users/';
      return this.httpClient.post<UserInterface>(
        url_api,
        { NombreUsuario:NombreUsuario, 
        Contrasenia:Contrasenia},
        {headers: this.headers})
        .pipe(map(data => data));
    }

    setUser(users: UserInterface): void{
      let user_string = JSON.stringify(users);
      localStorage.setItem('currentUser', user_string)
    }
  
    setToken(token): void{
      localStorage.setItem('accessToken', token)
    }
  
    getToken(){
      return localStorage.getItem('accessToken');
    }
  
    getCurrentUser(): UserInterface{
      let user_string = localStorage.getItem('currentUser');
      if((user_string)==undefined){
        let user: UserInterface = JSON.parse(user_string);
        return user;
      }else{
        return null;
      }
    }
  
    logoutUser(){
      let accessToken = localStorage.getItem('accessToken')
      const url_api = 'http://3.15.17.50:1337/users/';
      localStorage.removeItem("accessToken");
      localStorage.removeItem("currentUser");
      this.strapiservice.registroUsuer(false);
      AuthGuard;
      return this.httpClient.post<UserInterface>(url_api,  {headers: this.headers});
    }
  
}
