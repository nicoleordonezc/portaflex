import { menuFreelancer } from "./services/menuFreelancer.js";
import { menuCliente } from "./services/menuCliente.js";
import inquirer from 'inquirer';

async function menu() {
    let salida = false;

    while(!salida){
        const {opcion} = await inquirer.prompt([{
            type: "list",
            name: "opcion",
            message: "Seleccione una opción",
            choices: [
                "Soy Freelancer",
                "Soy Cliente",
                "❌ Salir"
            ]
        }]);
        switch (opcion) {
            case "Soy Freelancer":
                await menuFreelancer()
                break;
            case "Soy Cliente":
                await menuCliente()
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

menu()