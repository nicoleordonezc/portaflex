import Contrato from "../models/contratos.js";

export default class Finanzas extends Contrato {
  constructor(fecha_inicio, fecha_fin, valor, clienteID, contratoID, ingresos = [], egresos = []) {
    super(fecha_inicio, fecha_fin, valor);
    this.clienteID = clienteID;
    this.contratoID = contratoID;
    this.ingresos = ingresos;
    this.egresos = egresos;
  }
}