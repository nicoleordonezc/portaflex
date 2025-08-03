import inquirer from "inquirer";
import { seleccionarCliente } from "../utils/seleccionarCliente.js";
import { crearPropuesta } from "../controllers/propuestasControllers.js";

export default async function propuestas() {
    const { opcion } = await inquirer.prompt([
      {
        type: "list",
        name: "opcion",
        message: "📋 Menú de Propuestas",
        choices: [
          "➕ Crear propuesta",
          "✏️ Editar propuesta",
          "🔍 Ver propuestas",
          "🚪 Salir"
        ]
      }
    ]);

    switch (opcion) {
      case "➕ Crear propuesta":
        const propuestaData = await nuevaPropuesta();
        await crearPropuesta(propuestaData);
        break;

      case "✏️ Editar propuesta":
        console.log("🛠️ Funcionalidad de edición aún no implementada.");
        break;

      case "🔍 Ver propuestas":
        await verPropuestas();
        break;

      case "🚪 Salir":
        salir = true;
        console.log("👋 Saliendo del menú de propuestas...");
        break;
    }
};

async function nuevaPropuesta() {
  const clienteID = await seleccionarCliente();
  if (!clienteID) return;

  const respuestas = await inquirer.prompt([
    {
      type: "input",
      name: "nombre",
      message: "📌 Nombre de la propuesta:"
    },
    {
      type: "input",
      name: "descripcion",
      message: "📝 Descripción:"
    },
    {
      type: "number",
      name: "precio",
      message: "💰 Precio:"
    },
    {
      type: "input",
      name: "plazo",
      message: "⏳ Plazo (ej. 2025-07-01):"
    },
    {
      type: "list",
      name: "estado",
      message: "📍 Estado de la propuesta:",
      choices: ["Pendiente", "Aceptada", "Rechazada"]
    }
  ]);

   return {
    nombre: respuestas.nombre,
    descripcion: respuestas.descripcion,
    precio: respuestas.precio,
    plazo: new Date(respuestas.plazo),
    estado: respuestas.estado,
    clienteID
  };
}


