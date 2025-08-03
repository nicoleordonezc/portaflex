import { finanzas } from "../persistencia/db.js";
import { ObjectId } from "mongodb";
import inquirer from "inquirer";
import { seleccionarCliente } from "../utils/seleccionarCliente.js";

export async function calcularBalancePorCliente() {
  const coleccion = await finanzas();

  const clienteID = await seleccionarCliente(); // no uses destructuring
  const registros = await coleccion.find({ cliente_id: new ObjectId(clienteID) }).toArray();


  if (registros.length === 0) {
    console.log("📭 No hay movimientos registrados para este cliente.");
    return;
  }

  let totalIngresos = 0;
  let totalEgresos = 0;

  registros.forEach(doc => {
    doc.ingresos.forEach(i => totalIngresos += i.valor);
    doc.egresos.forEach(e => totalEgresos += e.valor);
  });

  console.log(`📊 Balance del cliente:\n - Ingresos: $${totalIngresos}\n - Egresos: $${totalEgresos}\n - Balance: $${totalIngresos - totalEgresos}`);
};

export async function calcularBalancePorFecha() {
  const { fechaDesde, fechaHasta } = await inquirer.prompt([
    {
      type: 'input',
      name: 'fechaDesde',
      message: '📅 Desde (YYYY-MM-DD):',
      validate: input => !isNaN(Date.parse(input)) || 'Fecha inválida'
    },
    {
      type: 'input',
      name: 'fechaHasta',
      message: '📅 Hasta (YYYY-MM-DD):',
      validate: input => !isNaN(Date.parse(input)) || 'Fecha inválida'
    }
  ]);

  const desde = new Date(fechaDesde);
  const hasta = new Date(fechaHasta);

  const coleccion = await finanzas();
  const registros = await coleccion.find().toArray();

  let totalIngresos = 0;
  let totalEgresos = 0;

  registros.forEach(doc => {
    doc.ingresos.forEach(i => {
      if (i.fecha >= desde && i.fecha <= hasta) totalIngresos += i.valor;
    });
    doc.egresos.forEach(e => {
      if (e.fecha >= desde && e.fecha <= hasta) totalEgresos += e.valor;
    });
  });

  console.log(`📆 Balance del periodo:\n - Ingresos: $${totalIngresos}\n - Egresos: $${totalEgresos}\n - Balance: $${totalIngresos - totalEgresos}`);
}

