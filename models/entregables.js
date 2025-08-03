export class Entregable {
    constructor(nombre, descripcion, fecha_limite, estado) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fecha_limite = fecha_limite;
        this.estado = estado;
        this.proyecto = null
    }
}