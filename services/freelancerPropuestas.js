import inquirer from "inquirer";
import { seleccionarCliente } from "../utils/seleccionarCliente.js";
import { crearPropuesta, verPropuestas } from "../controllers/propuestasControllers.js";
import { Nombre, Descripcion, Plazo, Precio, Estado } from "../controllers/propuestasFactory.js";
import { seleccionarPropuesta } from "../utils/seleccionarPropuesta.js";

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
        await editarPropuesta()
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


async function editarPropuesta() {
    const id = await seleccionarPropuesta();
    if (!id) return;

  const { opcion } = await inquirer.prompt([
    {
      type: "list",
      name: "opcion",
      message: "Seleccione la opción que desea actualizar:",
      choices: [
        "Nombre",
        "Descripción",
        "Precio",
        "Plazo",
        "Estado",
        "❌ Salir"
      ]
    }
  ]);

  switch (opcion) {
    case "Nombre":
      const { nombre } = await inquirer.prompt([
        {
          type: "input",
          name: "nombre",
          message: "📝 Nuevo nombre de la propuesta:"
        }
      ]);
      const nombreClase = new Nombre();
      await nombreClase.actualizar(id, nombre);
      break;

    case "Descripción":
      const { descripcion } = await inquirer.prompt([
        {
          type: "input",
          name: "descripcion",
          message: "📝 Nueva descripción:"
        }
      ]);
      const descripcionClase = new Descripcion();
      await descripcionClase.actualizar(id, descripcion);
      break;

    case "Precio":
      const { precio } = await inquirer.prompt([
        {
          type: "number",
          name: "precio",
          message: "💰 Nuevo precio:"
        }
      ]);
      const precioClase = new Precio();
      await precioClase.actualizar(id, precio);
      break;

    case "Plazo":
      const { plazo } = await inquirer.prompt([
        {
          type: "input",
          name: "plazo",
          message: "⏳ Nuevo plazo (formato YYYY-MM-DD):"
        }
      ]);
      const fechaPlazo = new Date(plazo);
      if (isNaN(fechaPlazo)) {
        console.log("❌ El formato de fecha no es válido.");
        return;
      }
      const plazoClase = new Plazo();
      await plazoClase.actualizar(id, fechaPlazo);
      break;

    case "Estado":
      const { estado } = await inquirer.prompt([
        {
          type: "list",
          name: "estado",
          message: "📍 Nuevo estado:",
          choices: ["Pendiente", "Aceptada", "Rechazada"]
        }
      ]);
      const estadoClase = new Estado();
      await estadoClase.actualizar(id, estado);
      break;

    case "❌ Salir":
      return;

    default:
      console.log("Opción no válida.");
      break;
  }
}