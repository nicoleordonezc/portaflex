import { Contrato } from "./contratos";

export class finanzas extends Contrato{
    constructor(fechaInicio, fechaFin, valor, nombre, clienteID, in_valor, in_fecha, in_tipo, eg_valor, eg_fecha, eg_tipo ) {
        super(fechaInicio, fechaFin, valor),
        this.nombre = nombre,
        this.clienteID = clienteID,
        this.in_valor = in_valor,
        this.in_fecha = in_fecha,
        this.in_tipo = in_tipo,
        this.eg_valor = eg_valor,
        this.eg_fecha = eg_fecha,
        this.eg_tipo = eg_tipo
    }
}