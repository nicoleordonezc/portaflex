import { entregables } from "../persistencia/db.js";
import { seleccionarProyecto } from "../utils/seleccionarProyecto.js";
import { Entregable } from "../models/entregables.js";
import inquirer from "inquirer";
import { ObjectId } from "mongodb";
import { client } from "../persistencia/db.js";

export async function crearEntregable() {
  const entregablesCol = await entregables();

  // Aquí se selecciona UN solo proyecto y se devuelve el ID directamente
  const proyectoId = await seleccionarProyecto();

  if (!proyectoId) {
    console.log("⚠️ No se seleccionó ningún proyecto.");
    return;
  }

  // Prompts para los demás campos
  const { nombre, descripcion, fecha_limite, estado } = await inquirer.prompt([
    { type: "input", name: "nombre", message: "Nombre del entregable:" },
    { type: "input", name: "descripcion", message: "Descripción:" },
    { type: "input", name: "fecha_limite", message: "Fecha límite (YYYY-MM-DD):" },
    {
      type: "list",
      name: "estado",
      message: "Estado del entregable:",
      choices: ["Pendiente", "Aprobado", "Entregado", "Rechazado"]
    }
  ]);

  // Crea el documento con el nombre correcto del campo
  const nuevo = new Entregable(
    nombre,
    descripcion,
    new Date(fecha_limite),
    estado,
    new ObjectId(proyectoId)
  );

  await entregablesCol.insertOne(nuevo);
  console.log("✅ Entregable creado con éxito.");
}


export async function listarEntregables() {
  const col = await entregables();
  const lista = await col.find().toArray();
  if (lista.length === 0) {
    console.log("📭 No hay entregables registrados.");
    return;
  }
  lista.forEach((e, i) => {
    console.log(`\n📌 ${i + 1}. ${e.nombre}`);
    console.log(`📝 Descripción: ${e.descripcion}`);
    console.log(`📅 Fecha límite: ${new Date(e.fecha_limite).toLocaleDateString()}`);
    console.log(`📌 Estado: ${e.estado}`);
  });
}

export async function editarEstadoEntregable() {
  const col = await entregables();
  const lista = await col.find().toArray();

  if (lista.length === 0) {
    console.log("📭 No hay entregables para editar.");
    return;
  }

  const { idEntregable, nuevoEstado } = await inquirer.prompt([
    {
      type: "list",
      name: "idEntregable",
      message: "Selecciona el entregable:",
      choices: lista.map((e) => ({ name: e.nombre, value: e._id }))
    },
    {
      type: "list",
      name: "nuevoEstado",
      message: "Selecciona el nuevo estado:",
      choices: ["Pendiente", "Aprobado", "Entregado", "Rechazado"]
    }
  ]);

  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      await col.updateOne(
        { _id: new ObjectId(idEntregable) },
        { $set: { estado: nuevoEstado } },
        { session }
      );
    });
    console.log("✅ Estado actualizado exitosamente.");
  } catch (error) {
    console.log("❌ Error en la transacción:", error);
  } finally {
    await session.endSession();
  }
}

export async function eliminarEntregable() {
  const col = await entregables();
  const lista = await col.find().toArray();

  if (lista.length === 0) {
    console.log("📭 No hay entregables registrados.");
    return;
  }

  const { idEntregable, confirmar } = await inquirer.prompt([
    {
      type: "list",
      name: "idEntregable",
      message: "Selecciona el entregable que deseas eliminar:",
      choices: lista.map((e) => ({ name: e.nombre, value: e._id }))
    },
    {
      type: "confirm",
      name: "confirmar",
      message: "¿Estás seguro de que deseas eliminar este entregable?"
    }
  ]);

  if (!confirmar) {
    console.log("❌ Eliminación cancelada.");
    return;
  }

  const session = client.startSession();
  try {
    await session.withTransaction(async () => {
      await col.deleteOne({ _id: new ObjectId(idEntregable) }, { session });
    });
    console.log("✅ Entregable eliminado correctamente.");
  } catch (error) {
    console.log("❌ Error en la transacción:", error);
  } finally {
    await session.endSession();
  }
}
