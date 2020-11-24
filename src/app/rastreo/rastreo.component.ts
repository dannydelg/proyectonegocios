import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrdenCompra } from '../models/orden';
import { StrapiService } from '../services/strapi.service';
import { Producto } from '../models/producto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rastreo',
  templateUrl: './rastreo.component.html',
  styleUrls: ['./rastreo.component.css']
})
export class RastreoComponent implements OnInit {
  laOrden: OrdenCompra;
  ordenCompra: OrdenCompra;
  endPoint: string;
  losProducto: Array<Producto> = [];
  encontrado: boolean;
  enbodega: boolean;
  constructor(private strapi: StrapiService) {
    this.endPoint = 'http://3.15.17.50:1337';
    //this.endPoint = 'http://localhost:1337';
    this.encontrado = false;
    this.enbodega = false;

  }

  ngOnInit(): void {
    this.laOrden = new OrdenCompra();
    this.ordenCompra = new OrdenCompra();
  }

  rastrearCompra(form: NgForm) {
    this.laOrden = form.value;

    this.strapi.getCompraByPagoId(this.laOrden.id.toString())
      .then(resp => {
        this.ordenCompra = resp[0];
        this.losProducto = this.ordenCompra.producto;
        console.log(this.ordenCompra);
        this.encontrado = true;
        if (this.ordenCompra.ubicacion === 'Pedido recibido, pendiente de alistar') {
          this.enbodega = true;
        }

      })
      .catch(err => {
        console.log('La compra no existe');
        Swal.fire('Opss!', 'NO se encontro la orden: ' + this.laOrden.id, 'error');
        this.encontrado = false;
      });


  }

}
