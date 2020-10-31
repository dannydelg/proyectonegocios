import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Factura } from '../../models/factura';
import { StrapiService } from '../../services/strapi.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  endPoint: string;
  arrFact: Array<Factura> = [];
  fact: Factura;
  factAdd: Factura;
  show = false;
  losPedido: Array<Factura> = [];
  pedidoCarrito: Array<Factura> = [];

  constructor(private strapi: StrapiService) {
    this.fact = new Factura();
    this.factAdd = new Factura();
    this.endPoint = 'http://localhost:1337';
   }


  async ngOnInit() {

    await this.strapi.getFacturas().subscribe(element => {
      this.arrFact = element;
      console.log(this.arrFact[1].imagen.url);
    });

  }

  getFactura(form: NgForm) {
    this.fact = form.value;
    this.strapi.getFactura(this.fact.id).subscribe((e) => {
      this.fact = e;
    });
   }

   agregarFact(form: NgForm){
    this.factAdd = form.value;
    console.log(this.factAdd);
    this.strapi.addFactura(this.factAdd).subscribe(resp => {
      console.log(resp);
      this.strapi.getFacturas().subscribe(element => {
        this.arrFact = element;

      });
    });

  }

  agregarPedido(laFact: Factura, form: NgForm){
    laFact.cant = form.value.cantidad;
    console.log(laFact);
    console.log(laFact.cant);
    this.losPedido.push(laFact);
    if (laFact.cant <= laFact.stock ) {
      console.log('Se puede vender');
      this.show = true;
      var unique = this.losPedido.filter( (e, index, array) => {
        return array.indexOf(e) === index;

      });

      if (unique.length === 0) {
        unique = this.losPedido;
        console.log(unique);

      }else{
        console.log(unique);
      }
      this.pedidoCarrito = unique;

    } else {
      this.show = false;
      console.log('No hay suficiente en stock ' + this.show);
    }

  }

  verCarrito(){
    
  } 
}
