import inquirer from "inquirer";
import { proyectos } from "../persistencia/db.js";

export async function seleccionarProyectoPorCliente(clienteID) {
  const proyectosCol = await proyectos();

  const resultados = await proyectosCol
    .find({ cliente: clienteID })
    .toArray();

  if (resultados.length === 0) {
    console.log("⚠️ Este cliente no tiene proyectos registrados.");
    return null;
  }

  const opciones = resultados.map((proyecto) => ({
    name: proyecto.nombre,
    value: proyecto._id
  }));

  const { proyectoSeleccionado } = await inquirer.prompt([
    {
      type: "list",
      name: "proyectoSeleccionado",
      message: "Selecciona un proyecto para este cliente:",
      choices: opciones
    }
  ]);

  return proyectoSeleccionado;
}
