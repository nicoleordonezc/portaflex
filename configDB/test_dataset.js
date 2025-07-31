// Data clientes

let cliente1 = db.clientes.insertOne({
  nombre: "Carlos Ramírez",
  identificador: "123456789",
  contacto: {
    telefono: "321-654-9870",
    correo: "carlosr@gmail.com"
  }
}).insertedId;

let cliente2 = db.clientes.insertOne({
  nombre: "Laura González",
  identificador: "9876543210",
  contacto: {
    telefono: "300-111-2222",
    correo: "laurag@hotmail.com"
  }
}).insertedId;

let cliente3 = db.clientes.insertOne({
  nombre: "Esteban Ríos",
  identificador: "112233445",
  contacto: {
    telefono: "310-222-3333",
    correo: "estebanr@outlook.com"
  }
}).insertedId;

let cliente4 = db.clientes.insertOne({
  nombre: "María Fernanda Suárez",
  identificador: "9988776655",
  contacto: {
    telefono: "312-444-5555",
    correo: "maria.suarez@yahoo.com"
  }
}).insertedId;

let cliente5 = db.clientes.insertOne({
  nombre: "Julián Navarro",
  identificador: "1010101010",
  contacto: {
    telefono: "314-666-7777",
    correo: "julian@empresa.com"
  }
}).insertedId;

//Data propuestas

propuestas = db.propuestas.insertMany([
  {
    nombre: "Optimización",
    descripcion: "Optimización del sistema de inventario",
    precio: 1500000,
    plazo: ISODate("2025-09-15T00:00:00Z"),
    estado: "Pendiente",
    cliente: cliente1
  },
  {
    nombre: "Implementación",
    descripcion: "Implementación de nueva plataforma web",
    precio: 2800000,
    plazo: ISODate("2025-10-01T00:00:00Z"),
    estado: "Aceptado",
    cliente: cliente3
  },
  {
    nombre: "Consultoría",
    descripcion: "Consultoría para mejora de procesos",
    precio: 900000,
    plazo: ISODate("2025-08-20T00:00:00Z"),
    estado: "Rechazado",
    cliente: cliente5
  }
])

//Data proyectos

let proyecto1 = db.proyectos.insertOne({
  nombre: "Optimización",
  descripcion: "Optimización del sistema de inventario",
  precio: 1500000,
  plazo: ISODate("2025-09-15T00:00:00Z"),
  estado: "Pendiente",
  cliente: {
    nombre: "Carlos Ramírez",
    identificador: "123456789"
  },
  entregables: [
    {
      nombre: "Informe inicial",
      fecha_limite: ISODate("2025-08-01T00:00:00Z"),
      estado: "Pendiente"
    }
  ]
}).insertedId;

let proyecto2 = db.proyectos.insertOne({
  nombre: "Implementación",
  descripcion: "Implementación de nueva plataforma web",
  precio: 2800000,
  plazo: ISODate("2025-10-01T00:00:00Z"),
  estado: "Aceptado",
  cliente: {
    nombre: "María Torres",
    identificador: "9876543210"
  },
  entregables: [
    {
      nombre: "Despliegue inicial",
      fecha_limite: ISODate("2025-09-10T00:00:00Z"),
      estado: "Aprobado"
    }
  ]
}).insertedId;

let proyecto3 = db.proyectos.insertOne({
  nombre: "Consultoría",
  descripcion: "Consultoría para mejora de procesos",
  precio: 900000,
  plazo: ISODate("2025-08-20T00:00:00Z"),
  estado: "Rechazado",
  cliente: {
    nombre: "Luis Fernández",
    identificador: "101112223"
  },
  entregables: [
    {
      nombre: "Análisis de situación",
      fecha_limite: ISODate("2025-07-30T00:00:00Z"),
      estado: "Rechazado"
    }
  ]
}).insertedId;

//Data entregables

db.entregables.insertMany([
  {
    nombre: "Informe inicial",
    descripcion: "Entrega del informe diagnóstico",
    fecha_limite: ISODate("2025-08-01T00:00:00Z"),
    estado: "Pendiente",
    proyecto_id: proyecto1
  },
  {
    nombre: "Plan de acción",
    descripcion: "Entrega del plan de acción optimizado",
    fecha_limite: ISODate("2025-08-10T00:00:00Z"),
    estado: "Aprobado",
    proyecto_id: proyecto1
  },
  {
    nombre: "Despliegue inicial",
    descripcion: "Entrega de la primera versión funcional",
    fecha_limite: ISODate("2025-09-10T00:00:00Z"),
    estado: "Aprobado",
    proyecto_id: proyecto2
  },
  {
    nombre: "Validación",
    descripcion: "Pruebas del sistema y retroalimentación",
    fecha_limite: ISODate("2025-09-20T00:00:00Z"),
    estado: "Pendiente",
    proyecto_id: proyecto2
  },
  {
    nombre: "Análisis de situación",
    descripcion: "Diagnóstico de los procesos internos",
    fecha_limite: ISODate("2025-07-30T00:00:00Z"),
    estado: "Rechazado",
    proyecto_id: proyecto3
  },
  {
    nombre: "Propuesta de mejora",
    descripcion: "Entrega de recomendaciones de optimización",
    fecha_limite: ISODate("2025-08-10T00:00:00Z"),
    estado: "Pendiente",
    proyecto_id: proyecto3
  }
]);

//Data contratos

db.contratos.insertMany([
  {
    fecha_inicio: ISODate("2025-07-01T00:00:00Z"),
    fecha_fin: ISODate("2025-12-01T00:00:00Z"),
    valor: 15000000,
    condiciones: "Entrega por fases y validación mensual",
    proyecto_id: proyecto1,
    cliente_id: cliente1
  },
  {
    fecha_inicio: ISODate("2025-08-01T00:00:00Z"),
    fecha_fin: ISODate("2026-02-01T00:00:00Z"),
    valor: 20000000,
    condiciones: "Pagos trimestrales y cláusula de confidencialidad",
    proyecto_id: proyecto2,
    cliente_id: cliente2
  },
  {
    fecha_inicio: ISODate("2025-07-15T00:00:00Z"),
    fecha_fin: ISODate("2025-10-15T00:00:00Z"),
    valor: 10000000,
    condiciones: "Revisión bimestral y entregas iterativas",
    proyecto_id: proyecto3,
    cliente_id: cliente3
  }
]);

//Data finanzas

db.finanzas.insertMany([
  {
    proyecto: {
      nombre: "Rediseño",
      precio: 15000000
    },
    ingresos: [
      {
        valor: 5000000,
        fecha: ISODate("2025-07-05T00:00:00Z"),
        tipo: "Transferencia"
      },
      {
        valor: 10000000,
        fecha: ISODate("2025-08-10T00:00:00Z"),
        tipo: "Consignación"
      }
    ],
    egresos: [
      {
        valor: 2000000,
        fecha: ISODate("2025-07-10T00:00:00Z"),
        tipo: "Pago"
      },
      {
        valor: 3000000,
        fecha: ISODate("2025-08-15T00:00:00Z"),
        tipo: "Insumos"
      }
    ],
    cliente_id: cliente1
  },
  {
    proyecto: {
      nombre: "Automatización",
      precio: 20000000
    },
    ingresos: [
      {
        valor: 10000000,
        fecha: ISODate("2025-07-20T00:00:00Z"),
        tipo: "Transferencia"
      },
      {
        valor: 10000000,
        fecha: ISODate("2025-09-01T00:00:00Z"),
        tipo: "Pago"
      }
    ],
    egresos: [
      {
        valor: 5000000,
        fecha: ISODate("2025-07-25T00:00:00Z"),
        tipo: "Honorarios"
      },
      {
        valor: 3000000,
        fecha: ISODate("2025-08-05T00:00:00Z"),
        tipo: "Servicios"
      }
    ],
    cliente_id: cliente2
  }
]);
