import { propuestas, proyectos } from "../persistencia/db.js";
import Proyecto from "../models/proyectos.js"
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

export class Estado extends EditarPropuesta {
    async actualizar(propuestaID, nuevoEstado) {
        const propuestaColeccion = await propuestas();
        const proyectoColeccion = await proyectos();

        try {
            // Actualizar el estado de la propuesta
            const resultado = await propuestaColeccion.updateOne(
                { _id: new ObjectId(propuestaID) },
                { $set: { estado: nuevoEstado } }
            );

            if (resultado.modifiedCount === 0) {
                console.log("⚠️ No se encontró la propuesta o el estado ya estaba actualizado.");
                return;
            }

            console.log("✅ Estado actualizado correctamente.");

            // Si el nuevo estado es "Aceptado", crear el proyecto
            if (nuevoEstado === "Aceptado") {
                const propuesta = await propuestaColeccion.findOne({ _id: new ObjectId(propuestaID) });

                if (!propuesta) {
                    console.log("❌ No se encontró la propuesta para crear el proyecto.");
                    return;
                }

                // Crear instancia de Proyecto
                const nuevoProyecto = new Proyecto(
                    propuesta.nombre,
                    propuesta.descripcion,
                    propuesta.precio,
                    propuesta.plazo,
                    propuesta.estado,
                    propuesta.cliente
                );

                const resultadoProyecto = await proyectoColeccion.insertOne(nuevoProyecto);

                if (resultadoProyecto.insertedId) {
                    console.log("📁 Proyecto creado automáticamente al aceptar la propuesta.");
                } else {
                    console.log("⚠️ No se pudo crear el proyecto.");
                }
            }

        } catch (error) {
            console.error("❌ Error al actualizar el estado o crear el proyecto:", error);
        }
    }
}
