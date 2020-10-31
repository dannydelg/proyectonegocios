import { Cliente } from './cliente';
import { Producto } from './producto';
export class OrdenCompra {
    id: number;
    pagoid: string;
    cliente: Cliente;
    producto: Producto[];
    totalpagodolar: number;
    totalpagocolon: number;
    tipocambio: number;
    fechaCompra: Date;
    ubicacion: string;

    constructor(){

    }
}