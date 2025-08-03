import inquirer from "inquirer";
import { ObjectId } from "mongodb";
import { clientes, proyectos, entregables, propuestas, contratos } from "../persistencia/db.js"; 

export async function menuCliente() {
  const coleccionClientes = await clientes();

  // 1. Pedir identificador del cliente
  const { identificador } = await inquirer.prompt([
    {
      type: "input",
      name: "identificador",
      message: "🔐 Ingresa tu identificador de cliente:",
    },
  ]);

  // 2. Buscar cliente
  const cliente = await coleccionClientes.findOne({ identificador });

  if (!cliente) {
    console.log("❌ Cliente no encontrado.");
    return;
  }

  console.log(`👋 Bienvenido, ${cliente.nombre}`);

  // 3. Menú interactivo
  let salir = false;

  while (!salir) {
    const { opcion } = await inquirer.prompt([
      {
        type: "list",
        name: "opcion",
        message: "📂 ¿Qué deseas consultar?",
        choices: [
          { name: "📁 Proyectos", value: "proyectos" },
          { name: "📌 Propuestas", value: "propuestas" },
          { name: "📑 Contratos", value: "contratos" },
          { name: "🚪 Salir", value: "salir" },
        ],
      },
    ]);

    switch (opcion) {
      case "proyectos":
        await mostrarProyectos(cliente._id)
        break;
      case "propuestas":
        await mostrarPorColeccion(await propuestas(), cliente._id, "Propuestas");
        break;
      case "contratos":
        await mostrarContratos(cliente._id);
        break;
      case "salir":
        salir = true;
        console.log("👋 Hasta pronto.");
        break;
    }
  }
}

async function mostrarPorColeccion(coleccion, clienteId, titulo) {
  const documentos = await coleccion.find({ cliente_id: clienteId }).toArray();

  if (documentos.length === 0) {
    console.log(`📭 No hay ${titulo.toLowerCase()} asociados.`);
    return;
  }

  console.log(`📌 ${titulo} asociados:`);
  documentos.forEach((doc, index) => {
    console.log(` ${index + 1}. ${doc.titulo || doc.nombre || JSON.stringify(doc)}`);
  });
};

export async function mostrarContratos(clienteID) {
  const col = await contratos();
  const resultado = await col.find({ cliente: new ObjectId(clienteID) }).toArray();

  if (resultado.length === 0) {
    console.log("📭 No hay contratos asociados.");
    return;
  }

  console.log("📄 Contratos asociados:");
  resultado.forEach(c => {
    console.log(`- Nombre: ${c.nombre}`);
    console.log(`  Valor: $${c.valor}`);
    console.log(`  Fecha inicio: ${new Date(c.fechaInicio).toLocaleDateString()}`);
    console.log(`  Fecha fin: ${new Date(c.fechaFin).toLocaleDateString()}\n`);
  });
};

export async function mostrarProyectos(clienteID) {
  const col = await proyectos();
  const resultado = await col.find({ cliente: new ObjectId(clienteID) }).toArray();

  if (resultado.length === 0) {
    console.log("📭 No hay proyectos asociados.");
    return;
  }

  console.log("📦 Proyectos asociados:");
  for (const proyecto of resultado) {
    console.log(`- Nombre: ${proyecto.nombre}`);
    console.log(`  Descripción: ${proyecto.descripcion}`);
    console.log(`  Precio: $${proyecto.precio}`);
    console.log(`  Estado: ${proyecto.estado}`);
    console.log(`  Plazo: ${new Date(proyecto.plazo).toLocaleDateString()}`);
    
    if (proyecto.entregables && proyecto.entregables.length > 0) {
      console.log("  📌 Entregables:");
      proyecto.entregables.forEach(e => {
        console.log(`    - ${e.nombre} (Fecha límite: ${new Date(e.fecha_limite).toLocaleDateString()}, Estado: ${e.estado})`);
      });
    } else {
      console.log("  🚫 Sin entregables.");
    }

    console.log("");
  }
}


