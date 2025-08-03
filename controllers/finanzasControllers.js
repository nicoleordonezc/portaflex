import inquirer from "inquirer";
import { contratos, finanzas } from "../persistencia/db.js";
import { seleccionarCliente } from "../utils/seleccionarCliente.js";
import Finanzas  from "../models/finanzas.js";
import { ObjectId } from "mongodb";
import { client } from "../persistencia/db.js";

export async function registrarIngreso() {
  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      // 1. Seleccionar Cliente
      const clienteID = await seleccionarCliente();

      // 2. Buscar contratos del cliente
      const contratosColeccion = await contratos();
      const contratosCliente = await contratosColeccion
        .find({ cliente_id: new ObjectId(clienteID) })
        .toArray();

      if (contratosCliente.length === 0) {
        throw new Error("❌ El cliente no tiene contratos registrados.");
      }

      // 3. Elegir contrato
      const { contratoSeleccionadoId } = await inquirer.prompt([
        {
          type: "list",
          name: "contratoSeleccionadoId",
          message: "📄 Elige un contrato:",
          choices: contratosCliente.map((c) => ({
            name: `${c._id} | ${c.fecha_inicio} - ${c.fecha_fin} | $${c.valor}`,
            value: c._id.toString(),
          })),
        },
      ]);

      const contratoElegido = contratosCliente.find(
        (c) => c._id.toString() === contratoSeleccionadoId
      );

      // 4. Pedir datos del ingreso
      const { valor, fecha, tipoTransaccion } = await inquirer.prompt([
        {
          type: "input",
          name: "valor",
          message: "💰 Valor del ingreso:",
          validate: (v) => (!isNaN(v) && v > 0 ? true : "Debe ser un número válido."),
        },
        {
          type: "input",
          name: "fecha",
          message: "📅 Fecha del ingreso (YYYY-MM-DD):",
          validate: (f) =>
            /^\d{4}-\d{2}-\d{2}$/.test(f) ? true : "Formato inválido (YYYY-MM-DD)",
        },
        {
          type: "list",
          name: "tipoTransaccion",
          message: "💳 Tipo de transacción:",
          choices: ["Transferencia", "Efectivo", "Cheque", "Otro"],
        },
      ]);

      const finanzasCol = await finanzas();

      // 5. Verificar si ya existe el ingreso
      const yaExiste = await finanzasCol.findOne({
        cliente_id: new ObjectId(clienteID),
        "ingresos.fecha": new Date(fecha),
        "ingresos.tipo": tipoTransaccion,
      });

      if (yaExiste) {
        throw new Error("⚠️ Esta transacción ya fue registrada.");
      }

      // 6. Ver si ya hay documento de finanzas del cliente
      const docExistente = await finanzasCol.findOne({
        cliente_id: new ObjectId(clienteID),
      });

      if (docExistente) {
        // Actualizar el documento con nuevo ingreso
        await finanzasCol.updateOne(
          { _id: docExistente._id },
          {
            $push: {
              ingresos: {
                valor: Number(valor),
                fecha: new Date(fecha),
                tipo: tipoTransaccion,
              },
            },
          },
          { session }
        );
      } else {
        // Insertar nuevo documentoimport Finanzas from "../models/finanzas.js";

// Crear instancia
const nuevaFinanza = new Finanzas(
  contratoElegido.fecha_inicio,
  contratoElegido.fecha_fin,
  contratoElegido.valor,
  contratoSeleccionadoId,
  clienteID,
  [
    {
      valor: Number(valor),
      fecha: new Date(fecha),
      tipo: tipoTransaccion,
    }
  ],
  [] // egresos vacíos
);

// Guardar en Mongo
await finanzasCol.insertOne({
  contrato: {
    precio: nuevaFinanza.valor,
    fecha_inicio: nuevaFinanza.fecha_inicio,
    fecha_fin: nuevaFinanza.fecha_fin,
  },
  ingresos: nuevaFinanza.ingresos,
  egresos: nuevaFinanza.egresos,
  cliente_id: new ObjectId(nuevaFinanza.clienteID),
}, { session });
}})
  } catch (err) {
    console.error("❌ Error al registrar ingreso:", err.message);
  } finally {
    await session.endSession();
  }
};

export async function registrarEgreso() {
  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      // 1. Seleccionar Cliente
      const clienteID = await seleccionarCliente();

      // 2. Buscar contratos del cliente
      const contratosColeccion = await contratos();
      const contratosCliente = await contratosColeccion
        .find({ cliente_id: new ObjectId(clienteID) })
        .toArray();

      if (contratosCliente.length === 0) {
        throw new Error("❌ El cliente no tiene contratos registrados.");
      }

      // 3. Elegir contrato
      const { contratoSeleccionadoId } = await inquirer.prompt([
        {
          type: "list",
          name: "contratoSeleccionadoId",
          message: "📄 Elige un contrato:",
          choices: contratosCliente.map((c) => ({
            name: `${c._id} | ${c.fecha_inicio} - ${c.fecha_fin} | $${c.valor}`,
            value: c._id.toString(),
          })),
        },
      ]);

      const contratoElegido = contratosCliente.find(
        (c) => c._id.toString() === contratoSeleccionadoId
      );

      // 4. Pedir datos del egreso
      const { valor, fecha, tipoTransaccion } = await inquirer.prompt([
        {
          type: "input",
          name: "valor",
          message: "💸 Valor del egreso:",
          validate: (v) => (!isNaN(v) && v > 0 ? true : "Debe ser un número válido."),
        },
        {
          type: "input",
          name: "fecha",
          message: "📅 Fecha del egreso (YYYY-MM-DD):",
          validate: (f) =>
            /^\d{4}-\d{2}-\d{2}$/.test(f) ? true : "Formato inválido (YYYY-MM-DD)",
        },
        {
          type: "list",
          name: "tipoTransaccion",
          message: "💳 Tipo de transacción:",
          choices: ["Transferencia", "Efectivo", "Cheque", "Otro"],
        },
      ]);

      const finanzasCol = await finanzas();

      // 5. Verificar si ya existe el egreso
      const yaExiste = await finanzasCol.findOne({
        cliente_id: new ObjectId(clienteID),
        "egresos.fecha": new Date(fecha),
        "egresos.tipo": tipoTransaccion,
      });

      if (yaExiste) {
        throw new Error("⚠️ Esta transacción ya fue registrada.");
      }

      // 6. Ver si ya hay documento de finanzas del cliente
      const docExistente = await finanzasCol.findOne({
        cliente_id: new ObjectId(clienteID),
      });

      if (docExistente) {
        // Actualizar el documento con nuevo egreso
        await finanzasCol.updateOne(
          { _id: docExistente._id },
          {
            $push: {
              egresos: {
                valor: Number(valor),
                fecha: new Date(fecha),
                tipo: tipoTransaccion,
              },
            },
          },
          { session }
        );
      } else {
        // Insertar nuevo documento
        const nuevaFinanza = new Finanzas(
          contratoElegido.fecha_inicio,
          contratoElegido.fecha_fin,
          contratoElegido.valor,
          contratoSeleccionadoId,
          clienteID,
          [], // ingresos vacíos
          [
            {
              valor: Number(valor),
              fecha: new Date(fecha),
              tipo: tipoTransaccion,
            }
          ]
        );

        await finanzasCol.insertOne({
          contrato: {
            precio: nuevaFinanza.valor,
            fecha_inicio: nuevaFinanza.fecha_inicio,
            fecha_fin: nuevaFinanza.fecha_fin,
          },
          ingresos: nuevaFinanza.ingresos,
          egresos: nuevaFinanza.egresos,
          cliente_id: new ObjectId(nuevaFinanza.clienteID),
        }, { session });
      }
    });
  } catch (err) {
    console.error("❌ Error al registrar egreso:", err.message);
  } finally {
    await session.endSession();
  }
}

