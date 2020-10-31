import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { Factura } from '../models/factura';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import axios from 'axios';
import { Cliente } from '../models/cliente';
import { OrdenCompra } from '../models/orden';




@Injectable({
  providedIn: 'root'
})
export class StrapiService {



  endPoint: string;
  private clientes$ = new Subject<Factura[]>();

  constructor(private httpClient: HttpClient) {
    this.endPoint =  'http://localhost:1337/';

  }
  getProductos(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.endPoint + 'productos');
  }

 async descontarStockTemporal(prod: Producto){
   // return this.httpClient.put<Producto>(this.endPoint + 'productos/', prod );
   await axios.put('http://localhost:1337/productos/' + prod.id, {
    stock: [prod.stock]
    })
  .then(response => {
    console.log(response);

   });

  }
  async retornarStock(prod: Producto){
    // return this.httpClient.put<Producto>(this.endPoint + 'productos/', prod );
    console.log(prod.stock + prod.cant);

    
    console.log(prod.stock);
    console.log(prod.cant);
    await axios.put('http://localhost:1337/productos/' + prod.id, {
     
        stock: [prod.cant + prod.stock]
     })
   .then(response => {
     console.log(response);
     

    });

   }

  getFacturas(): Observable<Factura[]> {

    return this.httpClient.get<Factura[]>(this.endPoint + 'productos');
  }

  getFactura(id): Observable<Factura> {
    return this.httpClient.get<Factura>(this.endPoint + 'productos/' + id);

  }
  addFactura(fact: Factura){

    return this.httpClient.post(this.endPoint + 'compras/', fact);
  }

  addClienteEsperaproducto(clienteProd: Cliente){
    return this.httpClient.post(this.endPoint + 'Esperaproductoagotados/', clienteProd);
  }

  async getCategorias(): Promise<Observable<string[]>> {
    return await this.httpClient.get<string[]>(this.endPoint + 'categorias');
  }

  getProductosByCategory(categoria): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.endPoint + 'productos/categoria/' + categoria);
  }




  async getCategories() {
    try {
      const response = await axios.get<string[]>(this.endPoint + 'categorias');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  generarOrden(orden: OrdenCompra){
    return this.httpClient.post<OrdenCompra>(this.endPoint + 'ordecompras/', orden);
  }

}
