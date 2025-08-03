import inquirer from "inquirer";
import { listarProyectos, editarProyecto, eliminarProyecto } from "../controllers/proyectosControllers.js";


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
        await editarProyecto();
        break;
      case "🗑️ Eliminar proyecto":
        await eliminarProyecto();
        break;
      case "❌ Salir":
        salir = true;
        break;
    }
  }
}
