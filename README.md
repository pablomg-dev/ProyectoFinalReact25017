# Proyecto tienda online para el curso de React de Talento Tech BA

Este es un proyecto de tienda online desarrollado para el curso de React de Talento Tech BA. Permite a los usuarios explorar productos, agregarlos al carrito, eliminarlos, y a los administradores gestionar el inventario de productos.

---

## Características principales

- Catálogo de productos interactivo (FakeStoreAPI y MockAPI)
- Carrito de compras con suma y eliminación de productos
- Panel de administración para agregar, editar y eliminar productos (MockAPI)
- Autenticación simple para acceso a funciones de administración
- Diseño responsivo con **React-Bootstrap**
- Iconos modernos con **React-Bootstrap Icons**
- Modales de confirmación para acciones importantes
- Feedback visual con **react-toastify**
- SEO con **react-helmet-async**
- Estilos personalizados con **styled-components**

---

## Tecnologías Utilizadas

- **React**: Biblioteca para construir interfaces de usuario
- **Vite**: Entorno de desarrollo rápido
- **React-Bootstrap**: Componentes Bootstrap para React
- **React-Bootstrap Icons**: Iconos SVG para React
- **React Router DOM**: Navegación entre páginas
- **styled-components**: CSS-in-JS para estilos personalizados
- **react-toastify**: Notificaciones y feedback visual
- **react-helmet-async**: SEO y gestión de metadatos
- **FakeStoreAPI**: API REST simulada para productos generales ([ver FakeStoreAPI](https://fakestoreapi.com/))
- **MockAPI**: API REST ficticia para gestión de productos administrados ([ver MockAPI](https://mockapi.io/))

---

## Cómo ejecutar el proyecto

1. Clona el repositorio:
    ```bash
    git clone https://github.com/pablomg-dev/ProyectoFinalReact25017.git
    ```
2. Ingresa al directorio del proyecto:
    ```bash
    cd ProyectoFinalReact25017
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```
4. Inicia la aplicación en modo desarrollo:
    ```bash
    npm run dev
    ```
    La app se abrirá en tu navegador en `http://localhost:5173`.

---

## Uso de MockAPI

El backend ficticio para la gestión de productos en el panel de administración utiliza [MockAPI](https://mockapi.io/). Puedes ver, agregar, editar y eliminar productos desde la sección **Admin**. Todas las operaciones CRUD se realizan contra la URL de MockAPI configurada en el código.

---

## Credenciales de Acceso

Para iniciar sesión como usuario administrador:

- **Usuario**: `admin`
- **Contraseña**: `admin123`

---

## Notas adicionales

- Si intentas agregar productos al carrito sin estar logueado, la app te pedirá iniciar sesión (en inglés).
- El proyecto es solo para fines educativos y no utiliza un backend real ni almacenamiento persistente.
- Puedes personalizar la URL de MockAPI en el código fuente si deseas usar tu propia instancia.

---
