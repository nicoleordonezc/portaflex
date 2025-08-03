import inquirer from "inquirer";
import clientes from "./freelancerClientes.js"
import propuestas from "./freelancerPropuestas.js";
import { proyectos } from "./freeelancerProyectos.js";
import { entregables } from "./freelancerEntregables.js";
import { contratos } from "./freelancerContratos.js";
import { finanzas } from "./freelancerFinanzas.js";


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
