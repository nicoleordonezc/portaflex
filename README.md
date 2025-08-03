
# 📁 Portaflex

Sistema CLI para la gestión de clientes, propuestas, proyectos, entregables, contratos y finanzas empresariales.

## 📌 Descripción del Proyecto

**Portaflex** es una aplicación de línea de comandos desarrollada en **Node.js** con una arquitectura modular, diseñada para gestionar flujos de trabajo administrativos como la creación y visualización de propuestas, contratos, proyectos, entregables y movimientos financieros por cliente.

Permite visualizar toda la información relacionada con un cliente en un solo lugar y aplicar restricciones reales de negocio, como evitar la eliminación de entregables aprobados o entregados.

## ⚙️ Instrucciones de Instalación y Uso

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/portaflex.git
cd portaflex
````

### 2. Instala las dependencias

```bash
npm install
```

### 3. Configura tu entorno

Crea un archivo `.env` con la URL de conexión a MongoDB:

```bash
MONGO_URI=mongodb://localhost:27017/portaflex
```

### 4. Ejecuta la aplicación

```bash
node index.js
```

Usa los menús interactivos para acceder a todas las funciones del sistema.

---

## 🗂️ Estructura del Proyecto

```
portaflex/
│
├── controllers/
│   └── controllers.js           # Lógica de alto nivel (usa Factory y Repository)
│   └── factory.js               # Instanciación de dependencias y separación de lógica
│ 
│ 
├── configDB/
│   ├── db_config.js
│ 
├── persistencia/
│   ├── db.js│ 
│   
│
├── services/
│   ├── menus.js│
│
├── models/
│   ├── cliente.js
│   ├── propuesta.js
│   ├── proyecto.js
│   ├── entregable.js
│   ├── contrato.js
│   └── finanzas.js             # Modelos de datos para cada colección
│
├── utils/
│   ├── seleccionarCliente.js      # Funciones para seleccionar
│
├── main.js                    # Punto de entrada (CLI principal)
└── README.md
```

---

## 🧱 Principios SOLID Aplicados

* **S – Responsabilidad Única:**
  Cada archivo o clase cumple una única función. Por ejemplo, `cliente.js` solo gestiona datos de clientes.

* **O – Abierto/Cerrado:**
  El sistema permite agregar nuevos módulos sin modificar los existentes (e.g., se pueden crear nuevos tipos de documentos sin alterar controladores).

* **L – Sustitución de Liskov:**
  Las funciones que esperan cierto tipo de entidad (como cliente o proyecto) pueden usar instancias sin romper la lógica.

* **I – Segregación de Interfaces:**
  Los módulos solo implementan métodos que necesitan, separando responsabilidades como validación, creación o consulta.

* **D – Inversión de Dependencias:**
  `controllers.js` no depende de implementaciones concretas, sino de abstracciones instanciadas por `factory.js`.

---

## 🧩 Patrones de Diseño Utilizados

* **Factory Pattern**
  Implementado en `factory.js`, donde se crean instancias de controladores y servicios, desacoplando la lógica de negocio del CLI.

* **Repository Pattern**
  Utilizado en `controllers.js` para acceder a los datos. Se abstrae la lógica de persistencia para que la lógica del negocio no dependa de MongoDB directamente.

---

## 🛠️ Consideraciones Técnicas

* **MongoDB**: Base de datos NoSQL, ideal para esquemas dinámicos como propuestas y contratos.
* **Inquirer.js**: Permite una experiencia de usuario amigable mediante menús interactivos en la terminal.
* **Node.js**: Ambiente de ejecución principal del proyecto.
* **Validaciones**: Se realizaron tanto a nivel de aplicación como en las validaciones de MongoDB (`$jsonSchema`).
* **Transacciones**: En operaciones críticas como eliminación de proyectos o entregables.
* **Reglas de negocio**:

  * No se puede eliminar un entregable si está aprobado o entregado.
  * Las finanzas no pueden tener fechas futuras.
  * Cada cliente tiene un menú exclusivo con todo lo relacionado.

---
## 📄 Evidencias

Puedes consultar las evidencias del proyecto aquí:  
[📥 Ver evidencia](https://drive.google.com/drive/folders/1xppLV__6Yvut0x1FJy_mIxoYsffJp-dF?usp=sharing)

---
## 👩‍💻 Créditos

Desarrollado por: **Nicole Ordoñez**
Salón: **U2**

---
