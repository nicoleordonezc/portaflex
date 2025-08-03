import { Propuesta } from "../models/propuestas.js";
import { propuestas } from "../persistencia/db.js";
import chalk from "chalk";
import _ from "lodash";

export async function crearPropuesta({nombre, descripcion, precio, plazo, estado, clienteID}) {
    const propuestaColeccion = await propuestas()
    if (_.isEmpty(clienteID) || _.isEmpty(estado))
        throw new Error(chalk.red("❌ Se deben llenar todos los datos."));
    try {
        const propuesta = new Propuesta(nombre, descripcion, precio, plazo, estado, clienteID);
        await propuestaColeccion.insertOne(propuesta);
        console.log("Una nueva propuesta ha sido registrado");
    } catch (error) {
        console.log("Hubo un error al registrar la propuesta"+ error);
    }
};