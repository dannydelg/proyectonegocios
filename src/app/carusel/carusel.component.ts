import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { StrapiService } from '../services/strapi.service';

@Component({
  selector: 'app-carusel',
  templateUrl: './carusel.component.html',
  styleUrls: ['./carusel.component.css']
})
export class CaruselComponent implements OnInit {

  endPoint: string;
  listaProductos: Array<Producto> = [];

  images: any;

  constructor(private strapi: StrapiService) {
    this.endPoint = 'http://3.15.17.50:1337';
    //this.endPoint = 'http://localhost:1337';
  }

  ngOnInit(): void {
    this.cargarProductos();
    //this.images = [1, 2, 3].map(() => `../../assets/labial.jpg`);


  }

  async cargarProductos(){

      await this.strapi.getProductos().subscribe(element => {
        this.listaProductos = element;
     
        this.images = this.listaProductos.map( (e) =>  this.endPoint + e.imagen[0].url  );
        
      });

  }
  



}
