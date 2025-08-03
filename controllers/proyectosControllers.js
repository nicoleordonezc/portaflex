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

export async function editarProyecto(proyectoID, nuevoEstado) {
        const proyectoColeccion = await proyectos();
        try {
            const resultado = await proyectoColeccion.updateOne(
                { _id: new ObjectId(proyectoID) },
                { $set: { estado: nuevoEstado } }
            );

            if (resultado.modifiedCount === 0) {
                console.log("⚠️ No se encontró el proyecto o el estado ya estaba actualizado.");
            } else {
                console.log("✅ Estado del proyecto actualizado correctamente.");
            }
        } catch (error) {
            console.error("❌ Error al actualizar el estado del proyecto:", error);
        }
};


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
