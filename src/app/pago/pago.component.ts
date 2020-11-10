import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { async } from '@angular/core/testing';
import Swal from 'sweetalert2';
import { Producto } from '../models/producto';
import { OrdenCompra } from '../models/orden';
import { StrapiService } from '../services/strapi.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

declare var paypal;

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  @ViewChild('paypal', { static: true}) paypalElement: ElementRef;
  listaPagar: Array<Producto> = [];
  total: number;
  totaldolar: number;
  tipocambio: number;
  descripcionCompra: string;
  ordenCompra: OrdenCompra;
  ordenResp: OrdenCompra;
  espera: boolean;


  constructor(private strapi: StrapiService,
              private router: Router,
              private spinner: NgxSpinnerService,
              ) {

    this.tipocambio = 601;
    this.descripcionCompra = '';
    this.ordenCompra = new OrdenCompra();
    this.ordenCompra = new OrdenCompra();
    this.espera = false;

  }

  ngOnInit(): void {

    this.listaPagar =  JSON.parse(localStorage.getItem('lista'));
    this.listaPagar.forEach(e => {
    this.descripcionCompra = e.descripcion;

    });
    

    this.total = 0;
    this.listaPagar.forEach(e => {
    const sub = (e.cant * e.precio);
    this.total = this.total + sub;

     });

    this.totaldolar = (this.total / this.tipocambio);
  
    console.log('total pagar: ' + this.totaldolar.toFixed(2));
    this.ordenCompra.producto = this.listaPagar;
    this.ordenCompra.totalpagodolar =  this.totaldolar;
    this.ordenCompra.totalpagocolon = this.total;
    this.ordenCompra.tipocambio = this.tipocambio;
    this.ordenCompra.fechaCompra = new Date();
    
    paypal
    .Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units:  [
            {
              description: this.descripcionCompra,
              amount: {
                currency_code: 'USD',
                value: this.totaldolar.toFixed(2),
              }
            }
          ]
        });
      },
      onApprove: async (data, actions) => {
        this.espera = true;
        this.spinner.show();
      
        const order = await actions.order.capture();
           /** spinner starts on init */
       

        setTimeout(() => {
         /** spinner ends after 5 seconds */
         this.spinner.hide();
       }, 5000);
        if (order.status === 'COMPLETED') {
          console.log(order.id);
          this.ordenCompra.pagoid = order.id;

          const cond = Swal.fire('Felicidades!', 'El pago ha sido exitoso su ordenens #' + order.id , 'success');
          if ((await cond).isConfirmed) {
            console.log(order);
            this.generarOrden(this.ordenCompra);

          }

        }else{
          Swal.fire('Opss!', 'Algo salio mal al procesar elpago' , 'error');
        }

      },
      onError: err => {
        console.log(err);
      }
    })
    .render( this.paypalElement.nativeElement);

  }

  generarOrden(orden: OrdenCompra){
    console.log('Envio ' + orden);
    this.strapi.generarOrden(orden).subscribe(resp => {
      this.ordenResp = resp;
      this.vaciarCarrito();
      this.router.navigate(['/confirmapago/', JSON.stringify(this.ordenResp)]);
      console.log('Respuesta' + this.ordenResp);
      console.log('Orden' + this.ordenResp.pagoid + ' Fecha ' + this.ordenResp.fechaCompra);
    });
  }

  vaciarCarrito(){
    localStorage.setItem('lista', '');
  }

}
