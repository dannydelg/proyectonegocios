import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OrdenCompra } from '../models/orden';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-confirmapago',
  templateUrl: './confirmapago.component.html',
  styleUrls: ['./confirmapago.component.css']
})
export class ConfirmapagoComponent implements OnInit {
ordenCompra: OrdenCompra;
losProducto: Array<Producto> = [];
endPoint: string;
total: number;
totalString: string;
totaldolar: string;
  constructor(private activateRoute: ActivatedRoute) {
    this.endPoint = 'http://localhost:1337';
    this.total = 0;

   }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((params: ParamMap) => {
      const orden = params.get('orden');
      this.ordenCompra = JSON.parse(orden);
      this.losProducto = this.ordenCompra.producto;
      //console.log('Ubicacion '  + this.ordenCompra.ubicacion);
      //console.log('losproducto ' + this.losProducto[0].descripcion);
      this.losProducto.forEach(e => {
        const subtotal = e.cant * e.precio;
        this.total = this.total + subtotal;
      });

      this.totalString = this.total.toFixed(2);
      this.totaldolar = this.ordenCompra.totalpagodolar.toFixed(2);
     

    });


  }

}
