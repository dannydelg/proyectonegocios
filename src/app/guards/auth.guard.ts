import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/app/models/Users-interface';

import {StrapiService} from '../services/strapi.service';



@Injectable({
  providedIn: 'root'
})



export class AuthGuard implements CanActivate{

  constructor(private strapiService: StrapiService){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    if (this.strapiService.logIn()){
      return true;
    }
    else{
      return false;
    }

  }

}

