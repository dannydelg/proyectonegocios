import { Component, OnInit } from '@angular/core';
import { Factura } from '../models/factura';
import { NgForm } from '@angular/forms';
import { StrapiService } from '../services/strapi.service';

@Component({
  selector: 'app-addfactura',
  templateUrl: './addfactura.component.html',
  styleUrls: ['./addfactura.component.css']
})
export class AddfacturaComponent implements OnInit {

  fact: Factura;

  constructor(private service: StrapiService) {
    this.fact = new Factura();
  }

  ngOnInit(): void {
  }

  agregarFact(form: NgForm){
    this.fact = form.value;
    console.log(this.fact);
    this.service.addFactura(this.fact).subscribe(resp => {
      console.log(resp);
    }) ;

  }



}
