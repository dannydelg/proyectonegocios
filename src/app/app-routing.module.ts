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


const routes: Routes = [
 // {path: '', component: HeaderComponent, pathMatch: 'full'},
  //{path: '**', redirectTo: '/', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'home/:cat', component: HomeComponent},
  {path: 'lista', component: FacturasComponent},
  //{path: 'carritocompras/:carrito', component: CarritoComponent},
  {path: 'carritocompras', component: CarritoComponent},
  {path: 'productoscategoria/:cat', component: ProductoscategoriaComponent},
  {path: 'pago', component: PagoComponent},
  {path: 'confirmapago/:orden', component: ConfirmapagoComponent},
  {path: 'rastreo', component: RastreoComponent},
  {path: 'rarusel', component: CaruselComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
