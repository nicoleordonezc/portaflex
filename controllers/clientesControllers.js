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
    const clienteColeccion = await clientes();
    try {
        const cliente = await clienteColeccion.find().toArray();
        if (cliente.length === 0) {
        console.log("No hay clientes registrados");
        } else {
            console.log("**************Lista de clientes***************");
            cliente.forEach((c) => {
            console.log(
                `Nombre: ${c.nombre} | Documento: ${c.identificador} | Telefono: ${c.telefono} | Correo: ${c.correo} `
            )});
            console.log("*********************************************")}
    } catch (error) {
        console.log("Hubo un error al listar los clientes"+ error);
    }
};

export async function elimiarCliente(clienteID) {
    const clienteColeccion = await clientes();
    try {
        await clienteColeccion.deleteOne({_id: clienteID})
        console.log("El cliente ha sido eliminado");
    } catch (error) {
        console.log("Hubo un error al eliminar el cliente"+ error);
    }
}