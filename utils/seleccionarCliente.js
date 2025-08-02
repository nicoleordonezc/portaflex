import inquirer from "inquirer";
import { clientes } from "../persistencia/db.js";

export async function seleccionarCliente() {
  const clienteColeccion = await clientes();
  const listaClientes = await clienteColeccion.find().toArray();

  if (listaClientes.length === 0) {
    console.log("⚠️ No hay clientes registrados.");
    return null;
  }

  const opciones = listaClientes.map((cliente) => ({
    name: `${cliente.nombre} (${cliente.identificador})`,
    value: cliente._id
  }));

  const { clienteID } = await inquirer.prompt([
    {
      type: "list",
      name: "clienteID",
      message: "Selecciona el cliente que deseas actualizar:",
      choices: opciones
    }
  ]);

  return clienteID; // Esto lo usas luego para actualizar campos
}
