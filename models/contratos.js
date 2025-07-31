export class Contrato{
    constructor(fechaInicio, fechaFin, valor, condiciones, proyectoID, clienteID){
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.valor = valor;
        this.condiciones = condiciones;
        this.proyectoID = proyectoID;
        this.clienteID = clienteID
    }
}