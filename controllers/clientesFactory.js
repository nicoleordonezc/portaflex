import { clientes } from "../persistencia/db.js";
import { ObjectId } from "mongodb";

class EditarCliente{
    async actualizar(){
        throw new Error("Este método debe ser implementado")
    }
}

export class Nombre extends EditarCliente{
    async actualizar(clienteID, nuevoNombre){
        const clienteColeccion = await clientes();
        try {
            const resultado = await clienteColeccion.updateOne({_id: new ObjectId(clienteID)},{$set:{nombre:nuevoNombre}});

            if (resultado.modifiedCount === 0) {
            console.log("⚠️ No se encontró el cliente o el nombre ya estaba actualizado.");
            } else {
                console.log("✅ Nombre actualizado correctamente.");
            }
        } catch (error) {
            console.error("❌ Error al actualizar el nombre:", error);
        }
    }
};

export class Telefono extends EditarCliente{
    async actualizar(clienteID, nuevoTelefono){
        const clienteColeccion = await clientes();
        try {
            const resultado = await clienteColeccion.updateOne({_id:clienteID},{$set:{telefono:nuevoTelefono}});

            if (resultado.modifiedCount === 0) {
            console.log("⚠️ No se encontró el cliente o el telefono ya estaba actualizado.");
            } else {
                console.log("✅ Telefono actualizado correctamente.");
            }
        } catch (error) {
            console.error("❌ Error al actualizar el telefono:", error);
        }
    }
};

export class Correo extends EditarCliente{
    async actualizar(clienteID, nuevoCorreo){
        const clienteColeccion = await clientes();
        try {
            const resultado = await clienteColeccion.updateOne({_id:clienteID},{$set:{correo:nuevoCorreo}});

            if (resultado.modifiedCount === 0) {
            console.log("⚠️ No se encontró el cliente o el correo ya estaba actualizado.");
            } else {
                console.log("✅ Correo actualizado correctamente.");
            }
        } catch (error) {
            console.error("❌ Error al actualizar el correo:", error);
        }
    }
}