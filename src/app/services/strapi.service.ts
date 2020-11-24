import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Factura } from '../models/factura';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import axios from 'axios';
import { Cliente } from '../models/cliente';
import { OrdenCompra } from '../models/orden';
import { UserInterface } from '../models/Users-interface';
import { TipoCambio } from '../models/tipocambio';




@Injectable({
  providedIn: 'root'
})
export class StrapiService {



  endPoint: string;
  private clientes$ = new Subject<Factura[]>();
  cond: boolean;
  bccr: string;
  
  constructor(private httpClient: HttpClient) {
    this.endPoint = 'http://3.15.17.50:1337/';
    //this.endPoint =  'http://localhost:1337/';
    this.bccr = 'https://tipodecambio.paginasweb.cr/api/';
    this.cond = false;

  }
  getProductos(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.endPoint + 'productos');
  }

  async descontarStockTemporal(prod: Producto) {
    // return this.httpClient.put<Producto>(this.endPoint + 'productos/', prod );
    await axios.put(this.endPoint + 'productos/' + prod.id, {
      stock: [prod.stock]
    })
      .then(response => {
        console.log(response);

      });

  }
  async retornarStock(prod: Producto) {
    // return this.httpClient.put<Producto>(this.endPoint + 'productos/', prod );
    console.log(prod.stock + prod.cant);


    console.log(prod.stock);
    console.log(prod.cant);
    await axios.put(this.endPoint + 'productos/' + prod.id, {

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
  addFactura(fact: Factura) {

    return this.httpClient.post(this.endPoint + 'compras/', fact);
  }

  addClienteEsperaproducto(clienteProd: Cliente) {
    return this.httpClient.post(this.endPoint + 'Esperaproductoagotados/', clienteProd);
  }

  async getCategorias(): Promise<Observable<string[]>> {
    return await this.httpClient.get<string[]>(this.endPoint + 'categorias');
  }

  getProductosByCategory(categoria): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.endPoint + 'productos/categoria/' + categoria);
  }

  getCompraById(categoria): Promise<Producto[]> {
    return this.httpClient.get<Producto[]>(this.endPoint + 'productos/categoria/' + categoria).toPromise()
      .then(resp => resp)
      .catch((err: any) => err);
  }

  async getCompraByOrdenId(id: string): Promise<OrdenCompra> {

    return await axios.get(this.endPoint + 'ordecompras/' + id)
      .then((response) => {
        return response.data as Promise<OrdenCompra>;
      });
  }



  // Busca el objeto compra pasando por parametro el id del pago
  async getCompraByPagoId(idPago: string): Promise<OrdenCompra> {

    return await axios.get(this.endPoint + 'ordecompras/orden/' + idPago)
      .then((response) => {
        return response.data as Promise<OrdenCompra>;
      });
  }






  async getCategories() {
    try {
      const response = await axios.get<string[]>(this.endPoint + 'categorias');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  generarOrden(orden: OrdenCompra) {
    return this.httpClient.post<OrdenCompra>(this.endPoint + 'ordecompras/', orden);
  }

  logIn(): boolean {
    return this.cond;
   }

   registroUsuer(laCondicion: boolean){
     this.cond = laCondicion;
   }

   async getUser(NombreUsuario: string, Contrasenia: string): Promise<UserInterface> {

    return await axios.get<UserInterface>(this.endPoint + 'users?NombreUsuario_eq=' + NombreUsuario
    + '&Contrasenia_eq=' + Contrasenia).
    then((resp) =>  {
     //console.log('Respuesta get user'+ resp.data[0]);

     return resp.data[0] as Promise <UserInterface>;
    }).
    catch((err: any) => err);

   }

    obtenerTipoCambio(fecha: string){

    return this.httpClient.get<TipoCambio>(this.bccr + fecha);

   }

}
