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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { RastreoComponent } from './rastreo/rastreo.component';
import { ListacomprasComponent } from './listacompras/listacompras.component';
import { CaruselComponent } from './carusel/carusel.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

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
    ConfirmapagoComponent,
    RastreoComponent,
    ListacomprasComponent,
    CaruselComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatSliderModule,
    SlickCarouselModule,
    NgxSpinnerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
