import { MongoClient } from "mongodb";

const uri = "mongodb+srv://nicoloe24:NIcol12345@nicole.m2m1ow1.mongodb.net/"

export const client = new MongoClient(uri);

export async function clientes() {
    await client.connect()
    const db = client.db("portaflex")
    const coleccion = db.collection("clientes")
    return coleccion
};

export async function propuestas() {
    await client.connect()
    const db = client.db("portaflex")
    const coleccion = db.collection("propuestas")
    return coleccion
};

export async function proyectos() {
    await client.connect()
    const db = client.db("portaflex")
    const coleccion = db.collection("proyectos")
    return coleccion
};

export async function entregables() {
    await client.connect()
    const db = client.db("portaflex")
    const coleccion = db.collection("entregables")
    return coleccion
};

export async function contratos() {
    await client.connect()
    const db = client.db("portaflex")
    const coleccion = db.collection("contratos")
    return coleccion
};

export async function finanzas() {
    await client.connect()
    const db = client.db("portaflex")
    const coleccion = db.collection("finanzas")
    return coleccion
};