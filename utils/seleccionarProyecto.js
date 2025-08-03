import inquirer from "inquirer";
import { proyectos } from "../persistencia/db.js"

export async function seleccionarProyecto() {
  const proyectoColeccion = await proyectos();
  const listaProyectos = await proyectoColeccion.find().toArray();

  if (listaProyectos.length === 0) {
    console.log("⚠️ No hay proyectos registrados.");
    return null;
  }

  const opciones = listaProyectos.map((proyecto) => ({
    name: `${proyecto.nombre} - Estado: ${proyecto.estado}`,
    value: proyecto._id
  }));

  const { proyectoID } = await inquirer.prompt([
    {
      type: "list",
      name: "proyectoID",
      message: "📌 Selecciona el proyecto que deseas:",
      choices: opciones
    }
  ]);

  return proyectoID;
}
