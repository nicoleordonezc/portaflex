import inquirer from "inquirer";
import { seleccionarCliente } from "../utils/seleccionarCliente.js";
import fs from "fs/promises";
import { clientes, proyectos, contratos, finanzas } from "../persistencia/db.js";

export async function menuExamen() {
  let salir = false;
  while (!salir) {
    const clienteID = await seleccionarCliente();
    const coleccionClientes = await clientes();
    const coleccionProyecto = await proyectos();
    const coleccionContratos = await contratos();
    const coleccionFinanazas = await finanzas();
    try {      
      const infoCliente = await coleccionClientes.findOne({_id:clienteID});      
      const infoProyectos = await coleccionProyecto.find({cliente:clienteID}).toArray();
      const infoContratos = await coleccionContratos.find({cliente_id: clienteID}).toArray();
      const infoFinanzas = await coleccionFinanazas.find({cliente_id:clienteID}).toArray();
      
      const informacion = (
        infoCliente, infoProyectos, infoContratos, infoFinanzas
      ).toString()  
      async function guardarCliente(ruta, informacion) {
        const guardar = await fs.appendFile(ruta, informacion)
        console.log("Todos los datos se ha exportado exitosamente");        
        return guardar
      }       
      guardarCliente("./archivo.json", informacion)
    } catch (error) {
      console.log("Error al exportar los datos"+ error);
      
    }
  }
}