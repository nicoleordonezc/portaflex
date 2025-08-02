import { crearCliente, verClientes } from "../controllers/clientesControllers.js";
import inquirer from "inquirer";

export async function menuFreelancer() {
    let salida = false;

    while(!salida){
        const {opcion} = await inquirer.prompt([{
            type: "list",
            name: "opcion",
            message: "Seleccione una opción",
            choices: [
                "Clientes",
                "Propuestas",
                "Proyectos",
                "Entregables",
                "Contratos",
                "Finanzas",
                "❌ Salir"
            ]
        }]);
        switch (opcion) {
            case "Clientes":
                await clientes()
                break;
            case "Propuestas":
                await propuestas()
                break;
            case "Proyectos":
                await proyectos()
                break;
            case "Entregables":
                await entregables()
                break;    
            case "Contratos":
                await contratos()
                break;
            case "Finanzas":
                await finanzas()
                break;        
            case "❌ Salir":
                salida = true;
                console.log('Hasta luego👋🏻');
                break;
            default:
                console.log('Seleccionaste una opción inválida');
                break;
        }
    }
}

async function clientes() {
     const {opcion} = await inquirer.prompt([{
            type: "list",
            name: "opcion",
            message: "Seleccione una opción",
            choices: [
                "Agregar Clientes",
                "Listar Clientes",
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
            default:
                break;
        }
}