import inquirer from "inquirer";
import { crearContrato, listarContratos } from "../controllers/contratosControllers.js";


export async function contratos() {
  let salir = false;

  while (!salir) {
    const { opcion } = await inquirer.prompt([
      {
        type: "list",
        name: "opcion",
        message: "📑 Menú de contratos",
        choices: [
          { name: "➕ Crear contrato", value: "crear" },
          { name: "📄 Listar contratos", value: "listar" },
          { name: "⬅️ Volver al menú principal", value: "salir" }
        ]
      }
    ]);

    switch (opcion) {
      case "crear":
        await crearContrato();
        break;
      case "listar":
        await listarContratos();
        break;
      case "salir":
        salir = true;
        break;
    }
  }
}
