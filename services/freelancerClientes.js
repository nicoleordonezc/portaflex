import { crearCliente, verClientes, elimiarCliente } from "../controllers/clientesControllers.js";
import { Nombre, Telefono, Correo } from "../controllers/clientesFactory.js";
import { seleccionarCliente } from "../utils/seleccionarCliente.js";
import inquirer from "inquirer";

export default async function clientes() {
     const {opcion} = await inquirer.prompt([{
            type: "list",
            name: "opcion",
            message: "Seleccione una opción",
            choices: [
                "Agregar Clientes",
                "Listar Clientes",
                "Actualizar Clientes",
                "Eliminar Clientes",
                "❌ Salir"
            ]
        }]);
        switch (opcion) {
            case "Agregar Clientes":
                const respuestas = await inquirer.prompt([
                {
                    type: "input",
                    name: "nombre",
                    message: "Ingrese el nombre del cliente o empresa:"
                },
                {
                    type: "input",
                    name: "identificador",
                    message: "Ingrese el documento del cliente o NIT/RUT:"
                },
                {
                    type: "input",
                    name: "correo",
                    message: "Ingrese el Correo del cliente o empresa:"
                },
                {
                    type: "input",
                    name: "telefono",
                    message: "Ingrese el telefono del cliente o empresa:"
                },
            ]);
                await crearCliente(respuestas)
                break;
            case "Listar Clientes":
                await verClientes();
                break;
            case "Actualizar Clientes":
                const id = await seleccionarCliente()
                const {opcion} = await inquirer.prompt([{
                type: "list",
                name: "opcion",
                message: "Seleccione la opción que desea actualizar",
                choices: [
                    "Nombre",
                    "Correo",
                    "Telefono",
                    "❌ Salir"
                ]
                }]);
                switch (opcion) {
                    case "Nombre":
                        const nuevoNombre = await inquirer.prompt([
                        {
                            type: "input",
                            name: "nombre",
                            message: "Ingrese el nuevo nombre del cliente o empresa:"
                        }]);
                        const nombreClase = new Nombre();
                        await nombreClase.actualizar(id, nuevoNombre.nombre); 
                        break;
                    case "Correo":
                        const nuevoCorreo = await inquirer.prompt([
                        {
                            type: "input",
                            name: "correo",
                            message: "Ingrese el nuevo correo del cliente o empresa:"
                        }]);
                        const nombreCorreo = new Correo();
                        await nombreCorreo.actualizar(id, nuevoCorreo.correo); 
                        break;
                    case "Telefono":
                        const nuevoTelefono = await inquirer.prompt([
                        {
                            type: "input",
                            name: "telefono",
                            message: "Ingrese el nuevo telefono del cliente o empresa:"
                        }]);
                        const nombreTelefono = new Telefono();
                        await nombreTelefono.actualizar(id, nuevoTelefono.telefono); 
                        break;
                    case "❌ Salir":
                        console.log('Hasta luego👋🏻');
                        break;        
                    default:
                        break;
                }    
                break;
            case "Eliminar Clientes":
                const clienteID = await seleccionarCliente();
                const { confirmacion } = await inquirer.prompt([
                {
                    type: "confirm",
                    name: "confirmacion",
                    message: "⚠️ ¿Estás seguro que deseas eliminar este cliente?",
                    default: false
                }
                ]);
                if (confirmacion) {
                await elimiarCliente(clienteID);
                } else {
                console.log("❌ Operación cancelada. El cliente no fue eliminado.");
                }
                break;
            case "❌ Salir":
                console.log('Hasta luego👋🏻');
                break;    
            default:
                break;
        }
}