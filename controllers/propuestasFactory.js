import { propuestas } from "../persistencia/db.js";
import { ObjectId } from "mongodb";

class EditarPropuesta{
    async actualizar(){
        throw new Error("Este método debe ser implementado")
    }
}

export class Nombre extends EditarPropuesta{
    async actualizar(propuestaID, nuevoNombre){
        const propuestaColeccion = await propuestas();
        try {
            const resultado = await propuestaColeccion.updateOne({_id: new ObjectId(propuestaID)},{$set:{nombre:nuevoNombre}});
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

export class Descripcion extends EditarPropuesta{
    async actualizar(propuestaID, nuevaDescripcion){
        const propuestaColeccion = await propuestas();
        try {
            const resultado = await propuestaColeccion.updateOne({_id: new ObjectId(propuestaID)},{$set:{descripcion:nuevaDescripcion}});
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

export class Precio extends EditarPropuesta{
    async actualizar(propuestaID, nuevoPrecio){
        const propuestaColeccion = await propuestas();
        try {
            const resultado = await propuestaColeccion.updateOne({_id: new ObjectId(propuestaID)},{$set:{precio:nuevoPrecio}});
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

export class Plazo extends EditarPropuesta{
    async actualizar(propuestaID, nuevoPlazo){
        const propuestaColeccion = await propuestas();
        try {
            const resultado = await propuestaColeccion.updateOne({_id: new ObjectId(propuestaID)},{$set:{plazo:nuevoPlazo}});
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

export class Estado extends EditarPropuesta{
    async actualizar(propuestaID, nuevoEstado){
        const propuestaColeccion = await propuestas();
        try {
            const resultado = await propuestaColeccion.updateOne({_id: new ObjectId(propuestaID)},{$set:{estado:nuevoEstado}});
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