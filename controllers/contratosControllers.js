import inquirer from "inquirer";
import { contratos } from "../persistencia/db.js";
import { seleccionarProyectoPorCliente } from "../utils/seleccionarProyectoPorCliente.js";
import { seleccionarCliente } from "../utils/seleccionarCliente.js";
import Contrato from "../models/contratos.js";
import { ObjectId } from "mongodb";

export async function crearContrato() {
  const contratosCol = await contratos();

  const clienteID = await seleccionarCliente();
  if (!clienteID) {
    console.log("❌ No se seleccionó ningún cliente.");
    return;
  }

  const proyectoID = await seleccionarProyectoPorCliente(clienteID);
  if (!proyectoID) {
    console.log("❌ No se seleccionó ningún proyecto.");
    return;
  }

  const { fecha_inicio, fecha_fin, valor, condiciones } = await inquirer.prompt([
    {
      type: "input",
      name: "fecha_inicio",
      message: "Fecha de inicio (YYYY-MM-DD):"
    },
    {
      type: "input",
      name: "fecha_fin",
      message: "Fecha de finalización (YYYY-MM-DD):"
    },
    {
      type: "number",
      name: "valor",
      message: "Valor del contrato:"
    },
    {
      type: "input",
      name: "condiciones",
      message: "Condiciones del contrato (debe iniciar con mayúscula):",
      validate: (input) => {
        return /^[A-ZÁÉÍÓÚÑ]/.test(input)
          ? true
          : "⚠️ Debe comenzar con mayúscula";
      }
    }
  ]);

  const nuevoContrato = new Contrato(
    new Date(fecha_inicio),
    new Date(fecha_fin),
    parseInt(valor),
    condiciones,
    new ObjectId(proyectoID),
    new ObjectId(clienteID)
  );

  const documento = {
    fecha_inicio: nuevoContrato.fechaInicio,
    fecha_fin: nuevoContrato.fechaFin,
    valor: nuevoContrato.valor,
    condiciones: nuevoContrato.condiciones,
    proyecto_id: nuevoContrato.proyectoID,
    cliente_id: nuevoContrato.clienteID
  };

  await contratosCol.insertOne(documento);
  console.log("✅ Contrato creado con éxito.");
}

// Función para listar contratos
export async function listarContratos() {
  const contratosCol = await contratos();
  const lista = await contratosCol.find().toArray();

  if (lista.length === 0) {
    console.log("📭 No hay contratos registrados.");
    return;
  }

  lista.forEach((contrato, index) => {
    console.log(`\n📄 Contrato #${index + 1}`);
    console.log(`🗓 Inicio: ${contrato.fecha_inicio.toISOString().split('T')[0]}`);
    console.log(`🗓 Fin: ${contrato.fecha_fin.toISOString().split('T')[0]}`);
    console.log(`💰 Valor: $${contrato.valor}`);
    console.log(`📌 Condiciones: ${contrato.condiciones}`);
    console.log(`📁 Proyecto ID: ${contrato.proyecto_id}`);
    console.log(`👤 Cliente ID: ${contrato.cliente_id}`);
  });
}

