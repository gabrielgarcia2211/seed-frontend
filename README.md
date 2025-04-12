
# 🧩 Proyecto Frontend en Vue.js

## Objetivo

Crear una pequeña SPA (Single Page Application) conectada a una API de Laravel. La aplicación debe realizar las siguientes acciones:

- Crear un formulario de autenticación con Vue.js.
- Listar los productos desde la API utilizando Axios.
- Permitir la creación de nuevos productos mediante un formulario.
- Validar los campos obligatorios en el frontend.

## Requisitos

Antes de comenzar, asegúrate de tener los siguientes elementos instalados en tu máquina:

- [Node.js API](https://github.com/gabrielgarcia2211/seed-microservice/) 
- [Laravel API](https://github.com/gabrielgarcia2211/seed-backend)

## 📁 Estructura del Proyecto

```
public
│   favicon.ico                # Ícono de la aplicación
│
└───src
    │   App.vue                # Componente principal de la aplicación
    │   axios.js               # Configuración de Axios para solicitudes HTTP
    │   main.js                # Archivo principal para inicializar la app Vue
    │
    ├───api
    │       auth.js            # API para la autenticación
    │       products.js        # API para gestionar productos
    │       report.js          # API para generar reportes
    │
    ├───assets
    │       main.css           # Estilos globales de la aplicación
    │
    ├───components
    │       Navbar.vue         # Componente de la barra de navegación
    │
    ├───router
    │       index.js           # Configuración de rutas de la SPA
    │
    ├───services
    │       authService.js     # Servicio para gestionar la autenticación
    │       productService.js  # Servicio para gestionar productos
    │       reportService.js   # Servicio para generar reportes
    │
    ├───utils
    │   │   index.js           # Utilidades generales
    │   │
    │   ├───alerts
    │   │       alertService.js # Servicio para mostrar alertas
    │   │
    │   └───errors
    │           readHttpStatusErrors.js # Manejo de errores HTTP
    │
    └───views
        │   Login.vue          # Vista para la página de inicio de sesión
        │   ProductList.vue    # Vista para listar productos
        │   Register.vue       # Vista para el registro de nuevos usuarios
        │
        └───actions
                ProductCreateModal.vue # Modal para crear productos

```


##  ⚙️ Instalación

### 🔁 1. Clonar el repositorio

Clona este proyecto de Vue.js:

```bash
git clone https://github.com/gabrielgarcia2211/seed-frontend.git
cd seed-frontend
```


#### 📦 2. Instalar dependencias

Dentro del directorio del proyecto, instala las dependencias utilizando NPM:

```bash
npm install
```

#### 🖥 3. Levantar el servidor de desarrollo

Dentro del directorio del proyecto, iniciamos el servidor:

```bash
npm run dev
```

Visita: http://localhost:5173/