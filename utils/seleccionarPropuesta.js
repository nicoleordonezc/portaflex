import inquirer from "inquirer";
import { propuestas } from "../persistencia/db.js"; // función que retorna la colección "propuestas"
import { ObjectId } from "mongodb";

export async function seleccionarPropuesta() {
  const coleccion = await propuestas();

  try {
    const lista = await coleccion
      .find({})
      .project({ nombre: 1, cliente: 1 }) // Solo mostramos estos campos
      .toArray();

    if (lista.length === 0) {
      console.log("📭 No hay propuestas registradas.");
      return null;
    }

    const { seleccion } = await inquirer.prompt([
      {
        type: "list",
        name: "seleccion",
        message: "Seleccione una propuesta:",
        choices: lista.map((propuesta) => ({
          name: `📝 ${propuesta.nombre} (ClienteID: ${propuesta.cliente})`,
          value: propuesta._id.toString()
        }))
      }
    ]);

    return new ObjectId(seleccion);
  } catch (error) {
    console.log("❌ Error al seleccionar la propuesta:", error.message);
    return null;
  }
}
