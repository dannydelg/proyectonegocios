import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/models/Users-interface';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  public user: UserInterface = {
    Nombre: '',
    Apellido: '',
    NombreUsuario: '',
    CorreoElectronico: '',
    Contrasenia: ''
  };

  ngOnInit(): void {
  }

  onRegister(): void{
    this.authService.registerUser(
      this.user.Nombre,
      this.user.Apellido, 
      this.user.NombreUsuario,
      this.user.CorreoElectronico,
      this.user.Contrasenia)
    .subscribe( user => {
      //console.log(user);
    this.authService.setUser(user);
    const token = user.Nombre;
    this.authService.setToken(token);
    this.router.navigate(['/home/']);
    });
  }

}
