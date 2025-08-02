import chalk from "chalk";
import _ from "lodash";
import { clientes } from "../persistencia/db.js";
import { Cliente } from "../models/clientes.js";

export async function crearCliente({nombre, identificador, correo, telefono}) {
    const clienteColeccion = await clientes()
    if (_.isEmpty(nombre) || _.isEmpty(identificador))
        throw new Error(chalk.red("❌ Se deben llenar todos los datos."));
    try {
        const cliente = new Cliente(nombre, identificador, correo, telefono);
        await clienteColeccion.insertOne(cliente);
        console.log("Un nuevo cliente ha sido registrado");
    } catch (error) {
        console.log("Hubo un error al registrar el cliente"+ error);
    }
};

export async function verClientes() {
    
}