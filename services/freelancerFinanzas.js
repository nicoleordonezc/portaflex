import inquirer from "inquirer";
import { registrarIngreso, registrarEgreso } from "../controllers/finanzasControllers.js";
import { calcularBalancePorCliente, calcularBalancePorFecha } from "../controllers/finanzasFactory.js";

export async function finanzas() {
  let salir = false;

  while (!salir) {
    const { opcion } = await inquirer.prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '📊 Menú Finanzas:',
        choices: [
          '💰 Registrar Ingreso',
          '💸 Registrar Egreso',
          '📈 Calcular Balance por Cliente',
          '📅 Calcular Balance por Fecha',
          '⬅️ Volver al menú principal'
        ]
      }
    ]);

    switch (opcion) {
      case '💰 Registrar Ingreso':
        await registrarIngreso();
        break;
      case '💸 Registrar Egreso':
        await registrarEgreso();
        break;
      case '📈 Calcular Balance por Cliente':
        await calcularBalancePorCliente();
        break;
      case '📅 Calcular Balance por Fecha':
        await calcularBalancePorFecha();
        break;
      case '⬅️ Volver al menú principal':
        salir = true;
        break;
    }
  }
}
