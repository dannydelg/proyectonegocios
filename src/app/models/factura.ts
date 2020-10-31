export class Factura {
    id: number;
    cliente: string;
    nombre: string;
    apellido: string;
    direccion: string;
    monto: number;
    numeroFactura: string;
    fechaCompra: Date;
    imagen: { name: '', url: ''};
    cant: number;
    stock: number;

    constructor(pid = 0, pnombre= '', papellido ='', pdireccion= '', pfactuNumero= '', pfoto = ''){
        this.id = pid;
        this.nombre = pnombre;
        this.apellido = papellido;
        this.direccion = pdireccion;
        this.numeroFactura = pfactuNumero;

    }
}