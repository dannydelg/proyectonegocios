export class Producto {
    
    codigo: number;
    descripcion: string;
    precio: number;
    stock: number;
    estado: string;
    imagen: { name: '', url: ''};
    categoria: string;
    cant: number;
    id: number;
    fechaCompra: Date;

    constructor(pid = 0){
        this.id = pid;
    }
}