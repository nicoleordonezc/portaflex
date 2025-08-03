import inquirer from "inquirer";
import { ObjectId } from 'mongodb';
import { clientes } from '../db/conexion.js';
import { contratos } from '../db/conexion.js';
import { finanzas as coleccionFinanzas } from '../db/conexion.js';
import { finanzas } from '../models/finanzas.js';

export async function menuFinanzas() {
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
        await registrarTransaccion('ingresos');
        break;
      case '💸 Registrar Egreso':
        await registrarTransaccion('egresos');
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
