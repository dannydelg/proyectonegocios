import { Producto } from './producto';
export class Cliente {
    nombre: string;
    email: string;
    comentario: string;
    infoPromo: boolean;
    producto: Producto;
    fecha: Date;

    constructor(){
    }
}