import inquirer from "inquirer";
import { crearEntregable, listarEntregables, editarEstadoEntregable, eliminarEntregable } from "../controllers/entregablesControllers.js";

export async function entregables() {
  let salir = false;
  while (!salir) {
    const { opcion } = await inquirer.prompt([
      {
        type: "list",
        name: "opcion",
        message: "Menú de Entregables",
        choices: [
          "Crear Entregable",
          "Listar Entregables",
          "Editar Estado de Entregable",
          "Eliminar Entregable",
          "Salir"
        ]
      }
    ]);

    switch (opcion) {
      case "Crear Entregable":
        await crearEntregable();
        break;
      case "Listar Entregables":
        await listarEntregables();
        break;
      case "Editar Estado de Entregable":
        await editarEstadoEntregable();
        break;
      case "Eliminar Entregable":
        await eliminarEntregable();
        break;
      case "Salir":
        salir = true;
        break;
    }
  }
}
