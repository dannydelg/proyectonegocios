import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from '../models/producto';
import { StrapiService } from '../services/strapi.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  lasCategorias: Array<string> = [];
  lasCategoriasDif: Array<string> = [];
  listaProductos: Array<Producto> = [];
  productosEncontrados: Array<Producto> = [];
  constructor(private strapi: StrapiService,
              private router: Router,
              private route: ActivatedRoute) { }

  async ngOnInit() {
    await this.strapi.getProductos().subscribe(element => {
      this.listaProductos = element;

      this.listaProductos.forEach((e, i) => {
        this.lasCategorias[i] = e.categoria;

       });


      this.lasCategoriasDif = this.lasCategorias.filter( (e, index, array) => {
        return  array.indexOf(e) === index;
      });


    });




  }

  buscarPorCategoria(categoria, event){
    console.log(event);
    console.log(categoria);
    let cate = Observable;
    cate = categoria;
    if (categoria === 'Cosmeticos') {
      this.router.navigate(['/home/', cate]);

    } else {
      this.router.navigate(['/productoscategoria/', cate]);
    }
    
  }

}
