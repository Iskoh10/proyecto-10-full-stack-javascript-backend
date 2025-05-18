# Proyecto 10-backend
## _ORGANIZADOR DE EVENTOS_

Una API RESTful que te permite gestionar eventos, usuarios, asistencia. Permite realizar operaciones CRUD (crear, leer, actualizar, eliminar) sobre los eventos y usuarios dependiendo de tu rol en la app.

## Endpoints

## **++Colección Eventos++**

### 1. **Obtener todos los eventos**
- **URL**: "/api/v1/events"
- **Método**: "GET"
- **Descripción**: Obtiene la lista de todos los eventos en la base de datos.
- **Respuesta de ejemplo**:
    ```json
    [
	{
		"_id": "682782b61454a7e2143f4639",
		"title": "Evento 1",
		"img": "https://images.unsplash.com/photo-1735327854928-6111ac6105c8?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		"date": "2025-05-16T00:00:00.000Z",
		"location": "Sevilla",
		"description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
		"participants": [],
		"__v": 0,
		"createdAt": "2025-05-16T18:23:50.876Z",
		"updatedAt": "2025-05-18T10:02:17.083Z"
	},
	{
		"_id": "682782b61454a7e2143f463a",
		"title": "Evento 2",
		"img": "https://images.unsplash.com/photo-1735064812398-48f3bb6330c1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		"date": "2025-06-18T00:00:00.000Z",
		"location": "Madrid",
		"description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
		"participants": [],
		"__v": 0,
		"createdAt": "2025-05-16T18:23:50.879Z",
		"updatedAt": "2025-05-16T18:23:50.879Z"
	},
    ]
    ```

### 2. **Crear un nuevo evento**
- **URL**: "/api/v1/events"
- **Método**: "POST"
- **Descripción**: Crea un nuevo evento en la base de datos.
- **Cuerpo de la solicitud (`multipart/form-data`)**:
    | Clave       | Tipo |  Descripción  |
    |-------------|------|---------------|
    | img         | File | filename.webp |
    | title       | Text |   Concierto   |
    | date        | Text |   2025-05-16  |
    | location    | Text |   Huelva      |
    | description | Text |   El primer   |
    
- **Respuesta de ejemplo**:
    ```json
    {
	    "title": "Concierto Bustamante",
	    "date": "2025-05-16T00:00:00.000Z",
	    "location": "Huelva",
	    "description": "El primer concierto roquero de David Bustamante",
	    "participants": [],
	    "_id": "67fcec4bc3dab8ae3d829214",
	    "img": "https://res.cloudinary.com/dqhivvhua/image/upload/v1744628810/gestorEventos/brng7eb6oqxqspajq9xr.webp",
	    "createdAt": "2025-04-14T11:06:51.824Z",
	    "updatedAt": "2025-04-14T11:06:51.824Z",
	    "__v": 0
    }
    ```

### 3. **Actualizar un evento**
- **URL**: "/api/v1/events/:id"
- **Método**: "PUT"
- **Descripción**: Actualiza los datos de un evento.
- **Parametros**:
    - `id`(requerido): El identificador único del evento.  


- **Cuerpo de la solicitud (`multipart/form-data`)**:
    | Clave        | Tipo |  Descripción    |
    |--------------|------|-----------------|
    | participants | Text | id participante |
    | leave        | Text |     true        |

- **Respuesta de ejemplo**:
    ```json
    {
	    "_id": "67f3a839b2df065e2889796c",
    	"title": "Concierto Bisbal",
    	"date": "2025-05-14T00:00:00.000Z",
    	"location": "Sevilla",
    	"description": "El último albúm de David Bisbal cantando a capella",
        	"participants": [
	    	"67f79d725062e813836bc7f0",
	    	"67fe3048425a6679c59884fb",
	    	"67ff7891a2ab6c6d7c81564f",
	    	"67ff879065ee628d32cc6495"
    	],
    	"createdAt": "2025-04-07T10:26:01.464Z",
    	"updatedAt": "2025-04-16T18:42:34.916Z",
    	"__v": 0,
    	"img": "https://res.cloudinary.com/dqhivvhua/image/upload/v1744568633/gestorEventos/gsvau426jquhil8bgsk6.webp"
    }
    ```
    
### 4. **Eliminar un evento**
- **URL**: "/api/v1/events/:id"
- **Método**: "DELETE"
- **Descripción**: Elimina un evento de la base de datos.
- **Parametros**:
    - `id`(requerido): El identificador único del evento.  
- **Respuesta de ejemplo**:
    ```json
    {
	"message": "Este evento fue eliminado",
	"eventDeleted": {
		"_id": "67f3a735913a8b27f0a31398",
		"title": "Concierto Bisbal",
		"date": "2025-06-21T00:00:00.000Z",
		"location": "Sevilla",
		"description": "El último albúm de David Bisbal cantando a capella",
		"participants": [],
		"createdAt": "2025-04-07T10:21:41.050Z",
		"updatedAt": "2025-04-07T10:25:02.349Z",
		"__v": 0
	}
    ```
    
## **++Colección Usuarios++**

### 1. **Obtener todos los usuarios**
- **URL**: "/api/v1/users"
- **Método**: "GET"
- **Descripción**: Obtiene la lista de todos los usuarios en la base de datos.
- **Respuesta de ejemplo**:
    ```json
    [
	{
		"_id": "67f79d725062e813836bc7f0",
		"nameUser": "admin",
		"rol": "admin"
	},
    ]
    ```

### 2. **Registar un nuevo usuario**
- **URL**: "/api/v1/users"
- **Método**: "POST"
- **Descripción**: Crea un nuevo usuario en la base de datos.
- **Cuerpo de la solicitud (`multipart/form-data`)**:
    | Clave       | Tipo |  Descripción  |
    |-------------|------|---------------|
    | nameUser    | Text |   Isco        |
    | img         | File | isco.webp     |
    | email       | Text |isco@gmail.com |
    | password    | Text |   isco1234    |
    
- **Respuesta de ejemplo**:
    ```json
   {
    	"nameUser": "Isco",
    	"email": "isco@gmail.com",
    	"password": "$2b$10$ENuiY9ZJ98a.iYSE2IpYBeUmo775LA9NVJjnlfeB.XpaiePitFgGy",
    	"rol": "admin",
    	"_id": "6800e01dbce7ed535fc2ff05",
    	"img": "https://res.cloudinary.com/dqhilvlua/image/upload/v1744887836/gestorEventos/mfxdcvua5cooxjvbwahs.jpg",
    	"createdAt": "2025-04-17T11:03:57.439Z",
    	"updatedAt": "2025-04-17T11:03:57.439Z",
	    "__v": 0
    }
    ```

### 3. **Actualizar un usuario**
- **URL**: "/api/v1/users/:id"
- **Método**: "PUT"
- **Descripción**: Actualiza un usuario existente.
- **Parametros**:
    - `id`(requerido): El identificador único de un usuario.  
- **Cuerpo de la solicitud**:
    ```json
    {
    	"password": "isco234"
    }
    ```
- **Respuesta de ejemplo**:
    ```json
    {
    	"_id": "67f7a304dbe44b7dcebf5776",
    	"nameUser": "Isco",
    	"email": "isco@gmail.com",
    	"password": "isco234",
    	"rol": "admin",
    	"createdAt": "2025-04-10T10:52:52.789Z",
    	"updatedAt": "2025-04-26T15:43:52.461Z",
    	"__v": 0,
    	"img": "https://res.cloudinary.com/dqhivvhua/image/upload/v1744562709/gestorEventos/tl5bqqdsordkxvnghyw5.jpg"
    }
    ```
    
### 4. **Eliminar un usuario**
- **URL**: "/api/v1/users/:id"
- **Método**: "DELETE"
- **Descripción**: Elimina un usuario de la base de datos.
- **Parametros**:
    - `id`(requerido): El identificador único del usuario.  
- **Respuesta de ejemplo**:
    ```json
   {
	"message": "Usuario eliminado",
	"userDeleted": {
		"_id": "67f7a204af4a39f58470ef2c",
		"nameUser": "Isco",
		"email": "isco@gmail.com",
		"password": "$2b$10$oeeVXcE8dtLFE4AGieEM1.u0q23z17HUt5Uv4/KuofTGWXIs3T.CS",
		"rol": "admin",
		"createdAt": "2025-04-10T10:48:37.091Z",
		"updatedAt": "2025-04-10T10:52:12.791Z",
		"__v": 0
	}
    ```
### 5. **Loguear un usuario**
- **URL**: "/api/v1/users/login"
- **Método**: "POST"
- **Descripción**: Loguea un usuario de la base de datos.
- **Cuerpo de la solicitud**:
    ```json
    {
	    "email": "isco@gmail.es",
    	"password": "isco234"
    }
    ```
- **Respuesta de ejemplo**:
    ```json
    {
    	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZjdhMzA0ZGJlNDRiN2RjZWJmNTc3NiIsImlhdCI6MTc0NTYwNDUyMCwiZXhwIjoxNzQ4MTk2NTIwfQ.vLC7n1QGCmvjeWkE0W2SPRBxPgy2zZjtsRxKTgWXUhE",
	    "user": {
		"_id": "67f7a304dbe44b7dcebf5776",
		"nameUser": "Isco",
		"email": "isco@gmail.com",
		"password": "$2b$70$FTJGdO2cmX.nVWjT5MiXlupg6PyY3uzJ7R3SpG2ebGSaHQ5IbPK8a",
		"rol": "admin",
		"createdAt": "2025-04-10T10:52:52.789Z",
		"updatedAt": "2025-04-13T18:25:09.940Z",
		"__v": 0,
		"img": "https://res.cloudinary.com/dqhivvhua/image/upload/v1744568709/gestorEventos/tl7bqqdsordkxvnghyw2.jpg"
	}
    ```
### 6. **Olvidó la contraseña**
- **URL**: "/api/auth/forgot-password"
- **Método**: "POST"
- **Descripción**: Forma para recuperar la contraseña olvidada.
- **Cuerpo de la solicitud**:
    ```json
    {
	    "email": "isco@gmail.com"
    }
    ```
    - **Respuesta de ejemplo**:
    ```json
      "El email para la recuperacion ha sido enviado"
    ```

## Installation
Sigue estos pasos para instalar y ejecutar la API en tu entorno local:
### 1. Clonar el repositorio
Clona este repositorio en tu maquina local usando el siguiente comando en la consola:
```sh
git clone https://github.com/Iskoh10/proyecto-10-full-stack-javascript-backend.git
```

### 2. Acceder al directorio del proyecto
Navega al directorio del proyecto clonado:
```sh
cd proyecto-10-full-stack-javascript-backend.git
```

### 3. Instalar las dependencias
Instala las dependencias necesarias:
```sh
npm install
```

### 4. Sembrar datos iniciales (opcional)
Incluye un script de seeds para incluir datos de eventos iniciales y un script para agregar usuarios iniciales:
```sh
npm run seed
npm run seedUser
```

### 5. Iniciar el servidor
Ejecuta el servidor con el comando:
```sh
npm run dev
```
El servidor estará disponible en: http://localhost:3000

### 6. Probar la API
Puedes usar la herramienta Insomnia para probar los endpoints de la API.

## License

**Free Software, Hell Yeah!**
