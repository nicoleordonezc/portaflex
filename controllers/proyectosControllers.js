import { proyectos } from "../persistencia/db.js";
import inquirer from "inquirer";
import { ObjectId } from "mongodb";

export async function listarProyectos() {
  const coleccion = await proyectos();
  const lista = await coleccion.find().toArray();

  if (lista.length === 0) {
    console.log("📭 No hay proyectos registrados.");
    return;
  }

  console.log("📋 Proyectos:");
  lista.forEach((p, i) => {
    console.log(`${i + 1}. ${p.nombre} - ${p.descripcion} - ${p.estado}`);
  });
}

export async function editarProyecto() {
  const coleccion = await proyectos();
  const lista = await coleccion.find().toArray();

  if (lista.length === 0) {
    console.log("📭 No hay proyectos registrados.");
    return;
  }

  const { idProyecto } = await inquirer.prompt([
    {
      type: "list",
      name: "idProyecto",
      message: "✏️ Selecciona el proyecto a editar:",
      choices: lista.map(p => ({
        name: `${p.nombre} (${p.estado})`,
        value: p._id.toString()
      }))
    }
  ]);

  const { nuevoEstado } = await inquirer.prompt([
    {
      type: "input",
      name: "nuevoEstado",
      message: "🔄 Nuevo estado del proyecto:"
    }
  ]);

  await coleccion.updateOne(
    { _id: new ObjectId(idProyecto) },
    { $set: { estado: nuevoEstado } }
  );

  console.log("✅ Proyecto actualizado.");
}

export async function eliminarProyecto() {
  const coleccion = await proyectos();
  const lista = await coleccion.find().toArray();

  if (lista.length === 0) {
    console.log("📭 No hay proyectos registrados.");
    return;
  }

  const { idProyecto } = await inquirer.prompt([
    {
      type: "list",
      name: "idProyecto",
      message: "🗑️ Selecciona el proyecto a eliminar:",
      choices: lista.map(p => ({
        name: `${p.nombre}`,
        value: p._id.toString()
      }))
    }
  ]);

  await coleccion.deleteOne({ _id: new ObjectId(idProyecto) });

  console.log("✅ Proyecto eliminado correctamente.");
}
