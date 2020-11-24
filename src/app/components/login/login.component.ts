import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/models/Users-interface';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router'
import {StrapiService} from 'src/app/services/strapi.service';
import { NgForm } from '@angular/forms'
import {AuthGuard} from 'src/app/guards/auth.guard';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 public user: UserInterface;
  constructor(private router: Router, private strapiservice: StrapiService) {
     this.user ={
      NombreUsuario: '',
      Contrasenia: ''
    };
   }

  ngOnInit(): void {
  }
  onLogin(formLogin: NgForm){
    this.user = formLogin.value;
    console.log(this.user);

    return this.strapiservice
    .getUser(this.user.NombreUsuario, this.user.Contrasenia)
    .then(
      data => {
     console.log('email = ' + data.CorreoElectronico);
     console.log(AuthGuard);
     this.strapiservice.registroUsuer(true);
     // tslint:disable-next-line: no-unused-expression
     AuthGuard;

     this.router.navigate(['/home/']);
    },
    error => console.log(error)
    )
    .catch((err: any) => {
    this.router.navigate(['/user/login/']);
    });
  }

}
