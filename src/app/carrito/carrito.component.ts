import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Producto } from '../models/producto';
import { Factura } from '../models/factura';
import { StrapiService } from '../services/strapi.service';



@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

 stringPedido: string;
 pedido: Array<Producto> = [];
 listaPed: Array<Producto> = [];
 listaDef: Array<Producto> = [];
 endPoint: string;
 total: number;
 tipocambio = 601;
 totaldolar: string;


  constructor(private service: StrapiService , private route: ActivatedRoute) {
    this.endPoint = 'http://localhost:1337';
    //this.stringPedido = this.route.snapshot.paramMap.get('carrito');
    this.pedido =  JSON.parse(localStorage.getItem('lista'));
    //this.pedido = JSON.parse(this.stringPedido);

    this.total = 0;
    this.pedido.forEach(e => {
    const sub = (e.cant * e.precio);
    this.total = this.total + sub;

     });
    console.log(this.total);
    this.totaldolar = (this.total / this.tipocambio).toFixed(2);

   }

  ngOnInit(): void {
    

  }

  grabarLocaStorag(){
    this.listaPed =  JSON.parse(localStorage.getItem('lista'));
    this.listaPed.forEach(e => {
      console.log(e.descripcion);
    });
  }

  eliminarProducto(prodEliminar: Producto){

    this.pedido.forEach(e => {
      if (e.id === prodEliminar.id) {
        let cantidadAnterior = localStorage.getItem('cantidadCarrito');
        let cant = Number(cantidadAnterior);
        cant = cant - prodEliminar.cant;
        localStorage.setItem('cantidadCarrito', cant.toString() );
       this.total = this.total - (prodEliminar.cant * prodEliminar.precio);
       let i = this.pedido.indexOf(prodEliminar);
       this.pedido.splice(i, 1 );
      }
    });
    localStorage.setItem('lista', JSON.stringify(this.pedido));
  
    this.totaldolar = (this.total / this.tipocambio).toFixed(2);

    this.devolverStock(prodEliminar);
  }

  devolverStock(prodDevolver: Producto){
    this.service.retornarStock(prodDevolver);
  }

}
