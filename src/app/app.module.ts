import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddfacturaComponent } from './addfactura/addfactura.component';
import { CarritoComponent } from './carrito/carrito.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductoscategoriaComponent } from './productoscategoria/productoscategoria.component';
import { PagoComponent } from './pago/pago.component';
import { ConfirmapagoComponent } from './confirmapago/confirmapago.component';

@NgModule({
  declarations: [
    AppComponent,
    FacturasComponent,
    AddfacturaComponent,
    CarritoComponent,
    HomeComponent,
    HeaderComponent,
    ModalComponent,
    ProductoscategoriaComponent,
    PagoComponent,
    ConfirmapagoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
