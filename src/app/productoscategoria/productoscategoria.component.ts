import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Cliente } from '../models/cliente';
import { Producto } from '../models/producto';
import { StrapiService } from '../services/strapi.service';

@Component({
  selector: 'app-productoscategoria',
  templateUrl: './productoscategoria.component.html',
  styleUrls: ['./productoscategoria.component.css']
})
export class ProductoscategoriaComponent implements OnInit {
categoria: string;
listaProductos: Array<Producto> = [];
endPoint: string;
fact: Producto;
factAdd: Producto;
show = false;
carritoVacio: boolean;
losPedido: Array<Producto> = [];
pedidoCarrito: Array<Producto> = [];
prodSuscribir: Producto;
client: Cliente;
cantidad = 0;
pageActual: number = 1;
constructor(private strapi: StrapiService,
            private route: ActivatedRoute,
            private router: Router,
            private NgModal: NgbModal,
            private modalService: NgbModal ) {
  
  this.fact = new Producto();
  this.factAdd = new Producto();
  this.endPoint = 'http://localhost:1337';
  this.client = new Cliente();
  this.prodSuscribir = new Producto;

 }

async ngOnInit() {
  this.categoria = this.route.snapshot.paramMap.get('cat');
  await this.strapi.getProductosByCategory(this.categoria).subscribe(element => {
    this.listaProductos = element;
    console.log(this.listaProductos[0].imagen.url);
    this.listaProductos.forEach(e => { console.log(e.descripcion); } );
  
    console.log(this.listaProductos);
  });
}

descontarStockTemporal(productDescontar: Producto): void{
  productDescontar.stock = productDescontar.stock - productDescontar.cant;
  const resp = this.strapi.descontarStockTemporal(productDescontar);
  console.log(resp);
}



agregarPedido(elProduct: Producto, form: NgForm, content: any){


  elProduct.cant = form.value.cantidad;
  console.log(elProduct);
  console.log(elProduct.cant);
  this.cantidad = this.cantidad + elProduct.cant;
  
  this.losPedido.push(elProduct);
  if (elProduct.cant <= elProduct.stock ) {
    console.log('Se puede vender');
    
    this.descontarStockTemporal(elProduct);
    this.show = true;
    let unique = this.losPedido.filter( (e, index, array) => {
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
    this.NgModal.open(content, {size: 'xl'});
  }

}

verCarrito(): void {

  if (localStorage.getItem('lista')) {
    let listaParcial: Array<Producto>  = JSON.parse(localStorage.getItem('lista'));
    listaParcial.forEach(e => {
       this.pedidoCarrito.forEach(ped => {
         if (e.id === ped.id){
          
            e.cant = e.cant + ped.cant;
            let i = this.pedidoCarrito.indexOf(ped);
            this.pedidoCarrito.splice(i, 1);
            }
      });
       this.pedidoCarrito.push(e);
     });
    
  }
 
  localStorage.setItem('lista' , JSON.stringify(this.pedidoCarrito));
  this.cantidad = localStorage.length;
  //localStorage.clear();
  //this.router.navigate(['/carritocompras', JSON.stringify(this.pedidoCarrito) ]);
  this.router.navigate(['/carritocompras']);
/*     if (this.pedidoCarrito.length > 0) {
    this.carritoVacio = false;
    console.log(this.pedidoCarrito);
   
  }else{
    this.carritoVacio = true;
  }
*/

}

openModal(content, prod: Producto){
  this.prodSuscribir = prod;
  console.log(prod.descripcion);
  this.NgModal.open(content, {size: 'xl', backdrop: 'static' });
}
infoProducto(form: NgForm, prod: Producto){
  
  this.client = form.value;
  const fecha = new Date();
  this.client.fecha = fecha;
  this.client.producto = prod;
  console.log('Cliente producto ' + this.client.producto.descripcion);
  this.strapi.addClienteEsperaproducto(this.client).subscribe(e => {
    if (e) {
      this.modalService.dismissAll();
      Swal.fire('Felicidades!', 'Pronto resiviras notificación de ' + this.client.producto.descripcion , 'success');
      console.log(e);
    }else{
      Swal.fire('Lo sentimos!', 'Algo salio mal!', 'error');

    }

  });

  console.log(this.client);
}


}
