import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Producto } from '../models/producto';
import { StrapiService } from '../services/strapi.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../models/cliente';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  @Input() cat: string;

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
  cantidad: number;
  pageActual = 1;
  categoria: string;
  constructor(private strapi: StrapiService,
              private router: Router,
              private activateRoute: ActivatedRoute,
              private NgModal: NgbModal,
              private modalService: NgbModal,
  ) {
    
    this.fact = new Producto();
    this.factAdd = new Producto();
    this.endPoint = 'http://3.15.17.50:1337';
    //this.endPoint = 'http://localhost:1337';
    this.client = new Cliente();
    this.prodSuscribir = new Producto();



  }



  async ngOnInit() {

  

    console.log(this.categoria);

    this.activateRoute.paramMap.subscribe((params: ParamMap) => {
      this.categoria = params.get('cat');
      this.cargarProductos();
      
      const cantstring = JSON.parse(localStorage.getItem('cantidadCarrito'));
      this.cantidad = cantstring;


    });




  }

  async cargarProductos() {
    if (this.categoria === undefined || this.categoria === null) {
      await this.strapi.getProductos().subscribe(element => {
        this.listaProductos = element;

        this.listaProductos.forEach(e => { console.log(e.descripcion); });

        console.log(this.listaProductos);
      });

    } else {

      await this.strapi.getProductosByCategory(this.categoria).subscribe(element => {
        this.listaProductos = element;

        this.listaProductos.forEach(e => { console.log(e.descripcion); });

        console.log(this.listaProductos);
      });

    }
  }

  descontarStockTemporal(productDescontar: Producto): void {
    productDescontar.stock = productDescontar.stock - productDescontar.cant;
    const resp = this.strapi.descontarStockTemporal(productDescontar);
    console.log(resp);
  }



  agregarPedido(elProduct: Producto, form: NgForm, content: any) {


    elProduct.cant = form.value.cantidad;
    console.log(elProduct);
    console.log(elProduct.cant);
    this.cantidad = this.cantidad + elProduct.cant;
    this.losPedido.push(elProduct);

    if (elProduct.cant <= elProduct.stock) {
      localStorage.setItem('cantidadCarrito', this.cantidad.toString());
      console.log('Se puede vender');

      this.descontarStockTemporal(elProduct);
      this.show = true;
      let unique = this.losPedido.filter((e, index, array) => {
        return array.indexOf(e) === index;

      });

      if (unique.length === 0) {
        unique = this.losPedido;
        console.log(unique);

      } else {
        console.log(unique);
      }
      this.pedidoCarrito = unique;


    } else {
      this.show = false;
      console.log('No hay suficiente en stock ' + this.show);
      this.NgModal.open(content, { size: 'xl' });
    }

  }

  verCarrito(): void {
    //localStorage.clear();
    if (localStorage.getItem('lista')) {
      const listaParcial: Array<Producto> = JSON.parse(localStorage.getItem('lista'));
      listaParcial.forEach(e => {
        this.pedidoCarrito.forEach(ped => {
          if (e.id === ped.id) {

            e.cant = e.cant + ped.cant;
            let i = this.pedidoCarrito.indexOf(ped);
            this.pedidoCarrito.splice(i, 1);
          }
        });
        this.pedidoCarrito.push(e);
      });
    }

    localStorage.setItem('lista', JSON.stringify(this.pedidoCarrito));
    this.cantidad = localStorage.length;

    this.router.navigate(['/carritocompras']);


  }

  openModal(content, prod: Producto) {
    this.prodSuscribir = prod;
    console.log(prod.descripcion);
    this.NgModal.open(content, { size: 'xl', backdrop: 'static' });
  }
  infoProducto(form: NgForm, prod: Producto) {

    this.client = form.value;
    const fecha = new Date();
    this.client.fecha = fecha;
    this.client.producto = prod;
    console.log('Cliente producto ' + this.client.producto.descripcion);
    this.strapi.addClienteEsperaproducto(this.client).subscribe(e => {
      if (e) {
        this.modalService.dismissAll();
        Swal.fire('Felicidades!', 'Pronto resiviras notificación de ' + this.client.producto.descripcion, 'success');
        console.log(e);
      } else {
        Swal.fire('Lo sentimos!', 'Algo salio mal!', 'error');

      }

    });

    console.log(this.client);
  }

}
