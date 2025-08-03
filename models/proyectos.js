import { Propuesta } from "./propuestas.js";

export default class Proyecto extends Propuesta {
    constructor(nombre, descripcion, precio, plazo, estado, cliente) {
        super(nombre, descripcion, precio, plazo, estado, cliente)
        this.entregables = []
    }
}