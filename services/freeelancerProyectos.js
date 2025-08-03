import inquirer from "inquirer";
import { listarProyectos, editarProyecto, eliminarProyecto } from "../controllers/proyectosControllers.js";
import { seleccionarProyecto } from "../utils/seleccionarProyecto.js";


export async function proyectos() {
  let salir = false;

  while (!salir) {
    const { opcion } = await inquirer.prompt([
      {
        type: "list",
        name: "opcion",
        message: "📋 Menú de Gestión de Proyectos",
        choices: [
          "📂 Listar proyectos",
          "✏️ Editar proyecto",
          "🗑️ Eliminar proyecto",
          "❌ Salir"
        ]
      }
    ]);

    switch (opcion) {
      case "📂 Listar proyectos":
        await listarProyectos();
        break;
      case "✏️ Editar proyecto":
        await editarEstadoProyecto();
        break;
      case "🗑️ Eliminar proyecto":
        await eliminarProyecto();
        break;
      case "❌ Salir":
        salir = true;
        break;
    }
  }
};


async function editarEstadoProyecto() {
    const { id } = await seleccionarProyecto();
    const { nuevoEstado } = await inquirer.prompt([
        {
            type: "list",
            name: "nuevoEstado",
            message: "📝 Selecciona el nuevo estado del proyecto:",
            choices: ["Activo", "Pausado", "Finalizado", "Cancelado"]
        }
    ]);

    editarProyecto(id, nuevoEstado)
}

