export class Propuesta {
    constructor(nombre, descripcion, precio, fecha_inicio, fecha_fin, estado, cliente){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.estado = estado;
        this.cliente = cliente
    }
}