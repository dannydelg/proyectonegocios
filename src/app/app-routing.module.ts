import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { AddfacturaComponent } from './addfactura/addfactura.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ProductoscategoriaComponent } from './productoscategoria/productoscategoria.component';
import { PagoComponent } from './pago/pago.component';
import { ConfirmapagoComponent } from './confirmapago/confirmapago.component';
import { RastreoComponent } from './rastreo/rastreo.component';
import { CaruselComponent } from './carusel/carusel.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
 // {path: '', component: HeaderComponent, pathMatch: 'full'},
  //{path: '**', redirectTo: '/', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'home/:cat', component: HomeComponent},
  {path: 'lista', component: FacturasComponent},
  //{path: 'carritocompras/:carrito', component: CarritoComponent},
  {path: 'carritocompras', component: CarritoComponent, canActivate: [AuthGuard] },
  {path: 'productoscategoria/:cat', component: ProductoscategoriaComponent},
  {path: 'pago', component: PagoComponent,  canActivate: [AuthGuard]},
  {path: 'confirmapago/:orden', component: ConfirmapagoComponent, canActivate: [AuthGuard]},
  {path: 'rastreo', component: RastreoComponent, canActivate: [AuthGuard]},
  {path: 'rarusel', component: CaruselComponent},
  {path: 'user/login',  component: LoginComponent },
  {path: 'user/register',  component: RegisterComponent },
  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
