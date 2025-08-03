import { proyectos } from "../persistencia/db.js";
import inquirer from "inquirer";
import { ObjectId } from "mongodb";
import { seleccionarProyecto } from "../utils/seleccionarProyecto.js";

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

  const idProyecto = await seleccionarProyecto();
  if (!idProyecto) return;

  const proyecto = await coleccion.findOne({ _id: new ObjectId(idProyecto) });

  if (!proyecto) {
    console.log("❌ Proyecto no encontrado.");
    return;
  }

  if (proyecto.estado === "Activo") {
    console.log("⚠️ No puedes eliminar un proyecto con estado 'Activo'.");
    return;
  }

  const { confirmar } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirmar",
      message: `¿Estás seguro de que deseas eliminar el proyecto "${proyecto.nombre}"?`,
      default: false
    }
  ]);

  if (!confirmar) {
    console.log("❌ Eliminación cancelada.");
    return;
  }

  await coleccion.deleteOne({ _id: new ObjectId(idProyecto) });
  console.log("✅ Proyecto eliminado correctamente.");
}
