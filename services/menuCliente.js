export async function menuCliente(identificador) {
    let salida = false;

    while(!salida){
        const {opcion} = await inquirer.prompt([{
            type: "list",
            name: "opcion",
            message: "Seleccione una opción",
            choices: [
                "Propuestas",
                "Proyectos",
                "Contratos",
                "❌ Salir"
            ]
        }]);
        switch (opcion) {
            case "Propuestas":
                await verPropuestas()
                break;
            case "Proyectos":
                await verProyectos()
                break;
            case "contrato":
                await verContratos()
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

async function verPropuestas(params) {
    
};

async function verProyectos() {
    
};

async function verContratos(params) {
    
}