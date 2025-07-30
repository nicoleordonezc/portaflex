
//Colección de clientes

db.createCollection("clientes", {
    validator: {
        $jsonSchema:{
            bsonType:"object",
            required:[
                "_id",
                "nombre",
                "identificador",
                "contacto"
            ],
            properties:{
                _id:{
                    bsonType: "objectId",
                    description: "Identificador único"
                },
                nombre: {
                    bsonType: "string",
                    pattern: "^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)(\\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$",
                    description: "El nombre y apellido deben iniciar con mayúscula"
                },
                identificador:{
                    bsonType:"string",
                    minLength: 9,
                    maxLength: 10,
                    description:"El identificador puede ser máximo 10 dígitos para persona natural y mínimo 9 dígitos para NIT o RUT"
                },
                contacto:{
                    bsonType: "object",
                    description: "Contácto tiene: telefono y correo",
                    required:[
                        "telefono",
                        "correo"
                    ],
                    properties: {
                        telefono:{
                            bsonType: "string",
                            pattern: "\\d{3}-\\d{3}-\\d{4}",
                            description: "El patrón del número telefónico debe ser xxx-xxx-xxxx"
                        },
                        correo: {
                            bsonType: "string",
                            pattern: "@\\w+\\.com$",
                            description: "El correo debe tener @ y finalizar en .com"
                        }
                    },                    
                        additionalProperties: false
            }
        }
    }}
});

//Colección de propuestas

db.createCollection("propuestas", {
    validator: {
        $jsonSchema:{
            bsonType:"object",
            required:[
                "_id",
                "nombre",
                "descripcion",
                "precio",
                "plazos",
                "estado",
                "cliente"
            ],
            properties:{
                _id:{
                    bsonType: "objectId",
                    description: "Identificador único"
                },
                nombre: {
                    bsonType: "string",
                    pattern: "^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)",
                    description: "El nombre de la propuesta debe iniciar con mayúscula"
                },
                descripcion:{
                    bsonType: "string",
                    pattern: "^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)",
                    description: "La descripción de la propuesta debe iniciar con mayúscula"
                },
                precio:{
                    bsonType:"int",
                    description:"El precio debe ser entero"
                },
                plazos:{
                    bsonType: "object",
                    description: "Plazsos tiene fecha de inicio y fecha de cierre",
                    required:[
                        "fechaInicio",
                        "fechaCierre"
                    ],
                    properties:{
                        fecha_inicio:{
                            bsonType:"date",
                            description: "La fecha de inicio debe ser contener la fecha completa ISODate('2025-07-01T10:45:00Z')"
                        },
                        fecha_cierre:{
                            bsonType:"date",
                            description: "La fecha de inicio debe ser contener la fecha completa ISODate('2025-07-01T10:45:00Z')"
                        }
                    },                    
                    additionalProperties: false
                },
                estado:{
                    bsonType: "string",
                    enum: ["Pendiente", "Aceptado", "Rechazado"],
                    description: "El estado debe estar Pendiente, Aceptado, Rechazado"
                },
                cliente:{
                    bsonType: "objectId",
                    description: "El cliente debe tener su identificador único"
                }
            },                    
            additionalProperties: false
        }}
})