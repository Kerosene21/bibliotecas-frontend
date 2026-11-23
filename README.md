# bibliotecas-frontend

Interfaz web para registrar bibliotecas y consultar los libros asociados a cada una.

## Tecnologías

- Angular 21
- TypeScript
- Formularios reactivos y HttpClient

## Requisitos

- Node.js 20.19, 22.12 o 24 (o versiones posteriores de esas ramas) y npm
- Backend `bibliotecas-backend` en ejecución en `http://localhost:8086`

## Ejecución

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Iniciar el servidor de desarrollo:

   ```bash
   npm start
   ```

3. Ejecutar las pruebas:

   ```bash
   npm test
   ```

Las peticiones a `/bibliotecas` se redirigen al backend mediante `proxy.conf.json`.

## Puerto

`http://localhost:4201`
