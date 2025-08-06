import { Propuesta } from "../models/propuestas.js";
import Proyecto from "../models/proyectos.js"
import { propuestas, proyectos } from "../persistencia/db.js";
import chalk from "chalk";
import _ from "lodash";

export async function crearPropuesta({nombre, descripcion, precio, plazo, estado, clienteID}) {
    const propuestaColeccion = await propuestas();
    if (_.isEmpty(clienteID) || _.isEmpty(estado))
      throw new Error(chalk.red("❌ Se deben llenar todos los datos."));
    try {
      const propuesta = new Propuesta(nombre, descripcion, precio, plazo, estado, clienteID);
      await propuestaColeccion.insertOne(propuesta);
      console.log("Una nueva propuesta ha sido registrado");
      
      if (estado === "Aceptado") {
        const proyectoColeccion = await proyectos();
        const proyecto = new Proyecto(nombre, descripcion, precio, plazo, "Activo", clienteID);
        await proyectoColeccion.insertOne(proyecto);
        console.log("🚀 Proyecto creado automáticamente al aceptar la propuesta.");
        }}catch (error) {
        console.log("Hubo un error al registrar la propuesta"+ error);
    }
};

export async function verPropuestas() {
  const propuestaColeccion = await propuestas();
  const todas = await propuestaColeccion.find().toArray();

  if (todas.length === 0) {
    console.log("⚠️ No hay propuestas registradas.");
    return;
  }

  console.log("📄 Lista de propuestas:");
  todas.forEach((p, i) => {
    console.log(`\n#${i + 1}`);
    console.log(`🧾 Nombre: ${p.nombre}`);
    console.log(`📝 Descripción: ${p.descripcion}`);
    console.log(`💵 Precio: $${p.precio}`);
    console.log(`⏳ Plazo: ${p.plazo}`);
    console.log(`📍 Estado: ${p.estado}`);
    console.log(`👤 Cliente ID: ${p.cliente}`);
  });
}
